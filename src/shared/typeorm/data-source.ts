import 'reflect-metadata';
import 'dotenv/config';
import { DataSource } from 'typeorm';

const port = process.env.PORT as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'arthur12',
  database: process.env.DB_NAME || 'mysales',
  entities: ['./src/modules/**/database/entities/*.{ts, js}'],
  migrations: ['./src/shared/typeorm/migrations/*.{ts, js}']
})
