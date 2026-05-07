import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUserRepositories } from 'src/modules/users/domain/repositories/IUserRepositories';
import { Repository } from 'typeorm';
import { User } from '../entities/Users';
import { AppDataSource } from 'src/shared/infra/typeorm/data-source';
import { IUser } from '@modules/users/domain/models/IUser';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export default class UsersRepository implements IUserRepositories {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<IUser> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const [users, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    };

    return result;
  }

  public async findByName(name: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      name,
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      id,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.ormRepository.findOneBy({
      email,
    });

    return user;
  }
}
