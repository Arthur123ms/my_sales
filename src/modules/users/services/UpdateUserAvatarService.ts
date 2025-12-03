import AppError from 'src/shared/errors/appError';
import { usersRespositories } from '../database/repositories/UserRepositories';
import { promises as fs } from 'fs';
import uploadConfig from '@config/upload';
import path from 'path';
import { User } from '../database/entities/Users';

interface IUpdateUserAvatar {
  userId: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRespositories.findById(userId);

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

    await usersRespositories.save(user);
    return user;
  }
}
