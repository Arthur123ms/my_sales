import AppError from 'src/shared/errors/appError';
import { sendEmail } from '@config/email';
import { injectable, inject } from 'tsyringe';
import { IUserRepositories } from '../domain/repositories/fakes/IUserRepositories';
import { IUserTokenRepositories } from '../domain/repositories/fakes/IUserTokenRepositories';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepositories')
    private userRepositories: IUserRepositories,

    @inject('UserTokenRepositories')
    private userTokenRepositories: IUserTokenRepositories,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepositories.findByEmail(email);

    if (!user) {
      throw new AppError('User no found', 404);
    }

    const token = await this.userTokenRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: 'My sales Recovery Passsword',
      body: `
    <div style="
      font-family: Arial, sans-serif;
      padding: 20px;
      color: #333;
      text-align: center;
      border: 2px solid #041d40;
      border-radius: 10px;
      margin: auto;
      width: 60%;
    ">
      <h1 style="color: #041d40;">Password Reset Verification Code</h1>
      <h3 style="color: #041d40;">Dear ${user.name},</h3>
      <p>Recover your password with this token:</p>
      <p>
        <strong style="
          border: 2px dashed #041d40;
          padding: 10px;
          border-radius: 5px;
          font-size: 16px;
          color: #041d40;
        ">
          ${token?.token}
        </strong>
      </p>
      <p style="margin-top: 20px;">
        Best regards,<br />
        <strong style="color: #041d40;">My Sales Staff</strong>
      </p>
    </div>
    `,
    });
  }
}
