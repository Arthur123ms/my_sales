import { injectable, inject } from 'tsyringe';
import { IPaginateUser } from '../domain/models/IPaginateUser';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';
import { User } from '../infra/database/entities/Users';
import { SearchParams } from '../infra/database/repositories/UserRepositories';

@injectable()
export default class ListUserService {
  constructor(
    @inject('UserRepositories')
    private userRepositories: IUserRepositories,
  ) {}
  public async execute({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const users = this.userRepositories.findAll({ page, skip, take });
    return users;
  }
}
