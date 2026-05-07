import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import ErrorHandlerMiddleware from 'src/shared/middlewares/ErrorHandleMiddleware';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
import rateLimiter from 'src/shared/middlewares/rateLimiter';
import 'src/shared/containers/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
app.use(ErrorHandlerMiddleware.handleError);

export default app;