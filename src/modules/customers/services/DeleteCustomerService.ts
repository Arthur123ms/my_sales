import AppError from 'src/shared/errors/appError';
import { customerRespositories } from '../database/repositories/CustomerRepositories';

interface IDeleteCustomerService {
  id: number;
}

export default class DeleteCustomerService {
  public async execute({ id }: IDeleteCustomerService): Promise<void> {
    const custumer = await customerRespositories.findById(id);

    if (!custumer) {
      throw new AppError('Customer not found', 404);
    }

    await customerRespositories.remove(custumer);
  }
}
