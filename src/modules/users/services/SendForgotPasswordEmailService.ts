import AppError from 'src/shared/errors/appError';
import { usersRespositories } from "../database/repositories/UserRepositories";
import { userTokenRepositories } from '../database/repositories/UserTokensRepositories'

interface IForgotPassword {
  email: string
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRespositories.findByEmail(email)

    if(!user) {
      throw new AppError('User no found', 404)
    }

    const token = await userTokenRepositories.generate(user.id)

    console.log(token)
  }
} 