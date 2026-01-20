import { Request, RequestHandler, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileSevice from '../services/UpdateProfileService';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export default class ProfileController {
  get(arg0: string, show: (request: Request, response: Response) => Promise<Response>) {
    throw new Error('Method not implemented.');
  }
  patch(arg0: string, updateUserSchema: RequestHandler<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, update: (request: Request, response: Response) => Promise<Response>) {
    throw new Error('Method not implemented.');
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = Number(request.user.id);

    const user = await showProfile.execute({ user_id });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileSevice()
    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    })

    return response.json(user)
  }
}
