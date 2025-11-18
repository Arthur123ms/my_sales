import { User } from '../database/entities/Users';
import { usersRespositories } from '../database/repositories/UserRepositories';

export default class LstUserService {
  async execute(): Promise<User[]> {
    const users = await usersRespositories.find();
    return users;
  }
}
