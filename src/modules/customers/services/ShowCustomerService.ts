import AppError from 'src/shared/errors/appError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepositories';

interface IShowCustomer {
  id: number;
}

export default class ShowCustomerService {
  constructor(private readonly customerRepositories: ICustomerRepository) { }

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
