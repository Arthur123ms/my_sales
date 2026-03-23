import AppError from 'src/shared/errors/appError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepositories';
import { injectable, inject } from 'tsyringe';

interface IUpdateCustomer {
  id: number;
  name: string;
  email: string;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomerRepository')
    private readonly customerRepositories: ICustomerRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customerRepositories.findById(id);

    if (!customer) {
      throw new AppError('Customer not found', 404);
    }

    const customerExists = await this.customerRepositories.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email', 409);
    }

    customer.name = name;
    customer.email = email;

    await this.customerRepositories.save(customer);

    return customer;
  }
}
