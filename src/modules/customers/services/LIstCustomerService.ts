import { IPagination } from 'src/shared/interface/pagination.interface';
import { customerRespositories } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';

export default class LisCustomerService {
  async execute(
    page: number = 1,
    limite: number = 10,
  ): Promise<IPagination<Customer>> {
    const [data, total] = await customerRespositories.findAndCount({
      take: limite,
      skip: (page - 1) * limite,
    });

    const totalPages = Math.ceil(total / limite);

    return {
      data,
      total,
      per_page: limite,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
    } as IPagination<Customer>;
  }
}
