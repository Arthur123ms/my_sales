import { IUserTokenRepositories } from '@moodules/users/domain/repositories/fakes/IUserTokenRepositories';
import { AppDataSource } from 'src/shared/infra/typeorm/data-source';
import { Repository } from 'typeorm';
import UserToken from '../entities/UserToken';
import { IUserToken } from '@moodules/users/domain/models/IUserToken';

export default class UserTokensRepositories implements IUserTokenRepositories {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<IUserToken | null> {
    const userToken = await this.ormRepository.findOneBy({
      token,
    });

    return userToken as unknown as IUserToken;
  }

  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken as unknown as IUserToken;
  }
}
