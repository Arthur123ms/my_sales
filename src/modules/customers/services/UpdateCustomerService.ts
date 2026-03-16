import AppError from 'src/shared/errors/appError';
import { customerRespositories } from '../infra/database/repositories/CustomerRepositories';
import { Customer } from '../infra/database/entities/Customer';

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await customerRespositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerExists = await customerRespositories.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email', 409);
    }

    customer.name = name;
    customer.email = email;

    await customerRespositories.save(customer);

    return customer;
  }
}
