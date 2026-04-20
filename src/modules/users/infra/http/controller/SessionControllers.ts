import { Response, Request } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionUserService from '../../../services/CreateSessionService';
import { container } from 'tsyringe';

export default class SessionControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = container.resolve(CreateSessionUserService);

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(instanceToInstance(user))
  }
}
