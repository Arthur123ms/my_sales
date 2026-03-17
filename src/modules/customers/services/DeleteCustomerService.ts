import AppError from 'src/shared/errors/appError';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepositories';


interface IDeleteCustomerService {
  id: number;
}

export default class DeleteCustomerService {
  constructor (private readonly customerRepositories: ICustomerRepository){}

  public async execute({ id }: IDeleteCustomerService): Promise<void> {
    const custumer = await this.customerRepositories.findById(id);

    if (!custumer) {
      throw new AppError('Customer not found', 404);
    }

    await this.customerRepositories.remove(custumer);
  }
}
