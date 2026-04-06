import { v4 as uuidv4 } from 'uuid';
import { User } from '@moodules/users/infra/database/entities/Users';
import { ICreateUser } from '../../models/ICreateUser';
import { IPaginateUser } from '../../models/IPaginateUser';
import { IUser } from '../../models/IUser';
import { IUserRepositories } from './IUserRepositories';

export default class FakeUserRepositories implements IUserRepositories {
  private users: User[] = [];

  async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email) as IUser;
  }

  public async create(userData: ICreateUser): Promise<IUser> {
    const user = new User();

    user.id = uuidv4();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;

    this.users.push(user);

    return user as IUser;
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(
      findUser => findUser.email === user.email,
    );

    if (findIndex !== -1) {
      this.users[findIndex] = user;
    } else {
      this.users.push(user);
    }
  }

  findAll({
    page,
    skip,
    take,
  }: {
    page: number;
    skip: number;
    take: number;
  }): Promise<IPaginateUser> {
    throw new Error('Method not implemented');
  }

  findByName(name: string): Promise<IUser | null> {
    throw new Error('Method not implemented');
  }

  findById(id: string): Promise<IUser | null> {
    throw new Error('Method not implemented');
  }
}


