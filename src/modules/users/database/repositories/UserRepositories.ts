import { AppDataSource } from 'src/shared/typeorm/data-source';
import { User } from '../entities/Users';

export const usersRespositories = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return this.findOneBy({ name });
  },

  async findById(id: number): Promise<User | null> {
    return this.findOneBy({ id });
  },

  async findByEmail(email: string): Promise<User | null> {
    return this.findOneBy({ email });
  },
});
