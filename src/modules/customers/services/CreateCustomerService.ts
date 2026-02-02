import AppError from 'src/shared/errors/appError';
import { customerRespositories } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailexists = await customerRespositories.findByEmail(email);

    if (emailexists) {
      throw new AppError('Email address alrealdy used.', 409);
    }

    const customer = customerRespositories.create({
      name,
      email,
    });

    await customerRespositories.save(customer);

    return customer;
  }
}
