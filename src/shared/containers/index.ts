import { ICustomerRepository } from '@moodules/customers/domain/repositories/ICustomerRepositories';
import customerRepository from '@moodules/customers/infra/database/repositories/CustomerRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  customerRepository,
);
