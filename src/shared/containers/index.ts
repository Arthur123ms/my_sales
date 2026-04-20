import { ICustomerRepository } from '@moodules/customers/domain/repositories/ICustomerRepositories';
import customerRepository from '@moodules/customers/infra/database/repositories/CustomerRepositories';
import { IOrderRepositories } from '@moodules/orders/domain/repositories/IOrderRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepository>(
  'CustomerRepository',
  customerRepository,
);

container.registerSingleton<IOrderRepositories>(
  'OrdersRepositories',
  ordrsReposistories
);

cotainer.registerSingleton<IUserRepositories>(
  'UsersRepositories',
  usersRepositories
);

container.registerSingleton<IProductsRepositories>(
  'ProductsRepositories',
  productsRepositories
)