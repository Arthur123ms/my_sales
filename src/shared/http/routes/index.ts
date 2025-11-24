import productRouter from '@moodules/products/routes/ProductRoutes';
import userRouter from '@moodules/users/routes/UserRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello Dev' });
});
routes.use('/products', productRouter)
routes.use('/users', userRouter)
routes.use('/session', userRouter)

export default routes;
