import { User } from '../infra/database/entities/Users';
import { usersRespositories } from '../infra/database/repositories/UserRepositories';

export default class ListUserService {
  async execute(): Promise<User[]> {
    const users = await usersRespositories.find();
    return users;
  }
}
