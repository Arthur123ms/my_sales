import { injectable, inject } from 'tsyringe';
import { IPaginateUser } from '../domain/models/IPaginateUser';
import { IUserRepositories } from '../domain/repositories/IUserRepositories';
import { User } from '../infra/database/entities/Users';
import { SearchParams } from '../infra/database/repositories/UserRepositories';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UsersRepositories')
    private usersRepositories: IUserRepositories,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const users = this.usersRepositories.findAll({ page, skip, take });
    return users;
  }
}
