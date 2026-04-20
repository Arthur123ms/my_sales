import { Response, Request } from 'express';
import ListUserService from '../../../services/ListUserSevice';
import CreateUserService from '../../../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const { page, skip, take } = request.query;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({
      page: Number(page),
      skip: Number(skip),
      take: Number(take),
    });

    return response.json(instanceToInstance(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      email,
      password,
      name,
    });
    return response.json(instanceToInstance(user));
  }
}
