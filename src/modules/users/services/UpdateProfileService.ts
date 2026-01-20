import AppError from 'src/shared/errors/appError';
import { usersRespositories } from '../database/repositories/UserRepositories';
import { User } from '../database/entities/Users';
import { compare, hash } from 'bcrypt';

interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export default class UpdateProfileSevice {
  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<User> {
    const user = await usersRespositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (email) {
      const userUpdateEmail = await usersRespositories.findByEmail(email);

      if (userUpdateEmail) {
        throw new AppError('There is already one user with this email', 404);
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError(' Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await usersRespositories.save(user);

    return user;
  }
}
