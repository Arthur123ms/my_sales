import { ICustomerRepositories } from '@modules/customers/domain/repositories/ICustomerRepositories';
import CustomerRepositories from '@modules/customers/infra/database/repositories/CustomerRepositories';
import { IOrderRepositories } from '@modules/orders/domain/repositories/IOrderRepositories';
import OrdersRepositories from '@modules/orders/infra/database/repositories/OrderRepositories';
import { IProductsRepositories } from '@modules/products/domain/repositories/IProductsRepositories';
import ProductsRepositories from '@modules/products/infra/database/repositories/ProductsRepositories';

import { IUserRepositories } from '@modules/users/domain/repositories/fakes/IUserRepositories';
import UsersRepositories from '@modules/users/infra/database/repositories/UserRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepositories>(
  'CustomerRepositories',
  CustomerRepositories,
);

container.registerSingleton<IOrderRepositories>(
  'OrdersRepositories',
  OrdersRepositories
)

container.registerSingleton<IUserRepositories>(
  'UsersRepositories',
  UsersRepositories
);

container.registerSingleton<IProductsRepositories>(
  'ProductsRepositories',
  ProductsRepositories
)
