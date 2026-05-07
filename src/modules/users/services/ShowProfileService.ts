import { inject } from 'tsyringe';
import AppError from 'src/shared/errors/appError';
import { IUserRepositories } from '../domain/repositories/IUserRepositories';
import { User } from '../infra/database/entities/Users';

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUserRepositories,
  ) {}
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    return user;
  }
}
