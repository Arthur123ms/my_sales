import { compare } from 'bcrypt';
import { User } from '../database/entities/Users';
import { usersRespositories } from '../database/repositories/UserRepositories';
import AppError from 'src/shared/errors/appError';
import { sign } from 'jsonwebtoken';

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRespositories().findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmation = await compare(password, user.password);

    if (!passwordConfirmation) {
      throw new AppError('Incorrect email/password combination', 401);
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
