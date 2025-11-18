import { usersRespositories } from '../database/repositories/UserRepositories';
import AppError from 'src/shared/errors/appError';
import { hash } from 'bcrypt';
import { User } from '../database/entities/Users';

interface ICreateUser {
  name: string;
  password: string;
  email: string;
}

export default class CreateUserService {
  async execute({ email, password, name }: ICreateUser): Promise<User> {
    const emailExists = await usersRespositories.findByEmail(email);

    if (!emailExists) {
      throw new AppError('Error address already used', 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRespositories.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRespositories.save(user);

    return user;
  }
}
