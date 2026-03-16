import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Product } from '@moodules/products/infra/database/entities/Product';
import { User } from '@moodules/users/infra/database/entities/Users';
import UserToken from '@moodules/users/infra/database/entities/UserToken';
import { Customer } from '@moodules/customers/infra/database/entities/Customer';
import { Order } from '@moodules/orders/infra/database/entities/Order';
import { OrdersProducts } from '@moodules/orders/infra/database/entities/OrdersProducts';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  database: process.env.DB_NAME!,
  entities: [Product, User, UserToken, Customer, Order, OrdersProducts], // <-- ESSENCIAL
  migrations: [__dirname + 'infra/typeorm/migrations/*.{ts,js}'],
  synchronize: true,
});
