import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IOrderProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Customer does not exists.', 400);
    }
    const storedProducts = await this.productsRepository.findAllById(products);
    if (!storedProducts || storedProducts.length !== products.length) {
      throw new AppError('One or more of the products does not exists.');
    }

    const orderProducts: IOrderProduct[] = [];

    const productsToUpdate = products.map(({ id, quantity }) => {
      const currentProduct = storedProducts.find(
        storedProduct => storedProduct.id === id,
      );
      if (!currentProduct) {
        throw new AppError(`Product with id ${id} not found.`);
      }
      if (quantity > currentProduct.quantity) {
        throw new AppError(
          `Insufficient stock for the product: ${currentProduct.name}`,
        );
      }
      orderProducts.push({
        price: currentProduct.price,
        product_id: currentProduct.id,
        quantity,
      });
      return {
        ...currentProduct,
        quantity: currentProduct.quantity - quantity,
      };
    });

    await this.productsRepository.updateQuantity(productsToUpdate);

    const order = await this.ordersRepository.create({
      customer: customerExists,
      products: orderProducts,
    });

    return order;
  }
}

export default CreateOrderService;
