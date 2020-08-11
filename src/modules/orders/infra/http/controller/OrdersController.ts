import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';
import Product from '@modules/products/infra/typeorm/entities/Product';

interface IRequest {
  customer_id: string;
  products: Product[];
}

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const findOrder = container.resolve(FindOrderService);

    const order = await findOrder.execute({ id: String(id) });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body as IRequest;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
