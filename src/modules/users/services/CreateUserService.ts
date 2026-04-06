import AppError from 'src/shared/errors/appError';
import { hash } from 'bcrypt';
import { User } from '../infra/database/entities/Users';
import { injectable, inject } from 'tsyringe';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';



interface IRequest {
  name: string;
  password: string;
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepositories')
    private userRepositories: IUserRepositories,
  ) {}
  async execute({ email, password, name }: IRequest): Promise<User> {
    const emailExists = await this.userRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError('Error address already used', 409);
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepositories.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
