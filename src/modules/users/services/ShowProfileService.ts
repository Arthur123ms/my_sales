import { inject } from 'tsyringe';
import AppError from 'src/shared/errors/appError';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';
import { User } from '../infra/database/entities/Users';

interface IRequest {
  user_id: string;
}

export default class ShowProfileService {
  constructor(
    @inject('UserRepositories')
    private userRepositories: IUserRepositories,
  ) {}
  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }
}
