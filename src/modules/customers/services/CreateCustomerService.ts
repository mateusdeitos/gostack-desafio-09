import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import ICustomersRepository from '../repositories/ICustomersRepository';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    if (!name) {
      throw new AppError('Name is required.');
    }
    if (!email) {
      throw new AppError('Email is required.');
    }

    const mailExists = await this.customersRepository.findByEmail(email);

    if (mailExists) {
      throw new AppError('This email is already being userd');
    }

    const user = await this.customersRepository.create({ email, name });

    return user;
  }
}

export default CreateCustomerService;
