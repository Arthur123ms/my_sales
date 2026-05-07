import AppError from 'src/shared/errors/appError';
import { IUserRepositories } from '../domain/repositories/IUserRepositories';
import  { IUserTokenRepositories }  from '../domain/repositories/IUserTokenRepositories';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}
@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUserRepositories,

    @inject('UserTokensRepositories')
    private userTokensRepositories: IUserTokenRepositories,
  ) {}
  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User token not exists.', 404);
    }

    const user = await this.usersRepositories.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.', 401);
    }

    user.password = await hash(password, 10);

    await this.usersRepositories.save(user);
  }
}

export default ResetPasswordService;
