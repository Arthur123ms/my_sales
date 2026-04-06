import AppError from 'src/shared/errors/appError';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'dotenv/config';
import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';
import { User } from '../infra/database/entities/Users';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepositories,
  ) {}
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, process.env.APP_SECRET as string, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
