import AppError from 'src/shared/errors/appError';
import { customerRespositories } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await customerRespositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
