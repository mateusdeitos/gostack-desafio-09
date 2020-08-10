import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

import { container } from 'tsyringe';
import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

export default class CustomersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body as ICreateCustomerDTO;

    const createCustomer = container.resolve(CreateCustomerService);

    const user = await createCustomer.execute({
      name,
      email,
    });

    return response.json(user);
  }
}
