import AppError from 'src/shared/errors/appError';
import { Customer } from '../infra/database/entities/Customer';
import { ICreateCustomer } from '../domain/models/ICreateUser';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCustomerService {
  constructor(
    @inject('CustomerRepositories')
    private readonly customerRepositories: ICustomerRepositories,
  ) {}
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailexists = await this.customerRepositories.findByEmail(email);

    if (emailexists) {
      throw new AppError('Email address alrealdy used.', 409);
    }

    const customer = await this.customerRepositories.create({
      name,
      email,
    });

    return customer;
  }
}
