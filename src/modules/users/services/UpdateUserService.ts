import { inject, injectable } from 'tsyringe';
import { compare, hash } from 'bcrypt';
import AppError from 'src/shared/errors/appError';
import { IUserRepositories } from '../domain/repositories/IUserRepositories';
import { User } from '../infra/database/entities/Users';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('usersRepositories')
    private usersRepositories: IUserRepositories,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepositories.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (email) {
      const userUpdateEmail = await this.usersRepositories.findByEmail(email);

      if (userUpdateEmail) {
        throw new AppError('There is already one user with this email.', 409);
      }
      user.email = email;
    }

     if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepositories.save(user);

    return user;
  }
}

export default UpdateProfileService;
  

