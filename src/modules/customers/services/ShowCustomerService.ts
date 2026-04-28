import AppError from 'src/shared/errors/appError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepositories';
import { inject, injectable } from 'tsyringe';

interface IShowCustomer {
  id: number;
}

@injectable()
export default class ShowCustomerService {
  constructor(
    @inject('CustomerRepositories')
    private readonly customerRepositories: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    return customer;
  }
}
