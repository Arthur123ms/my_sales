import productRouter from '@moodules/products/infra/http/routes/ProductRoutes';
import userRouter from '@moodules/users/infra/http/routes/UserRoutes';
import sessionRouter from '@moodules/users/infra/http/routes/SessionRoutes';
import express, { Router } from 'express';
import avatarRouter from '@moodules/users/infra/http/routes/AvatarRoutes';
import uploadConfig from '@config/upload';
import passwordRouter from '@moodules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@moodules/users/infra/http/routes/ProfileRoutes';
import customerRouter from '@moodules/customers/infra/http/routes/CustomerRoutes';
import orderRouter from '@moodules/orders/infra/http/routes/OrderRoutes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello Dev' });
});
routes.use('/products', productRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionRouter);
routes.use('/avatar', avatarRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/password', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', orderRouter)

export default routes;
