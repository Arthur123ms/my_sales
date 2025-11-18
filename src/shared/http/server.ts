import express from 'express';
import cors from 'cors';
import { errors } from 'celebrate'
import routes from './routes';
import { AppDataSource } from '../typeorm/data-source';
import 'express-async-errors';
import ErrorHandleMiddleware from '../middlewares/ErrorHandleMiddleware';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(errors())
    app.use(routes);

    app.use(ErrorHandleMiddleware.handleError);

    console.log('Connected to the database!!');

    app.listen(3333, () => {
      console.log('Server started on port 3333!');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
