import productRouter from '@moodules/products/routes/ProductRoutes';
import userRouter from '@moodules/users/routes/UserRoutes';
import sessionRouter from '@moodules/users/routes/SessionRoutes';
import express, { Router } from 'express';
import avatarRouter from '@moodules/users/routes/AvatarRoutes';
import uploadConfig from '@config/upload'
import passwordRouter from '@moodules/users/routes/PasswordRoutes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello Dev' });
});
routes.use('/products', productRouter)
routes.use('/users', userRouter)
routes.use('/session', sessionRouter)
routes.use('/avatar', avatarRouter)
routes.use('/files', express.static(uploadConfig.directory))
routes.use('/password', passwordRouter)

export default routes;
