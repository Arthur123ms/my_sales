import { userTokenRepositories } from '../database/repositories/UserTokensRepositories';
import { usersRespositories } from '../database/repositories/UserRepositories';
import AppError from 'src/shared/errors/appError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await userTokenRepositories.findByToken(token);

    if (!userToken) {
      throw new AppError('User not found', 404);
    }

    const user = await usersRespositories.findById(userToken.id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('User not found', 401);
    }

    user.password = await hash(password, 10);

    await usersRespositories.save(user);
  }
}
