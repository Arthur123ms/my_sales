import AppError from 'src/shared/errors/appError';
import { User } from "../database/entities/Users";
import { usersRespositories } from "../database/repositories/UserRepositories";

interface IShowProfile{
  user_id: number
}

export default class ShowProfileService {
  async execute({ user_id }: IShowProfile): Promise<User> {
    const user = await usersRespositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
