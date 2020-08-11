import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '@modules/products/services/CreateProductService';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body as ICreateProductDTO;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
}
