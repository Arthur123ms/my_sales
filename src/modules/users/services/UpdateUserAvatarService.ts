import AppError from 'src/shared/errors/appError';
import { promises as fs } from 'fs';
import uploadConfig from '@config/upload';
import path from 'path';
import { User } from '../infra/database/entities/Users';
import { inject, injectable } from 'tsyringe';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UserRepositories')
    private userRepositories: IUserRepositories
  ) {}
  async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const user = await this.userRepositories.findById(userId);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await this.userRepositories.save(user);
    return user;
  }
}
