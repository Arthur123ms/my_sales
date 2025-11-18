import { Response, Request } from 'express';
import ListUserService from '../services/LIstUserSevice';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();
    const user = await listUser.execute();
    return response.json(user);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      email,
      password,
      name,
    });
    return response.json(user);
  }
}
