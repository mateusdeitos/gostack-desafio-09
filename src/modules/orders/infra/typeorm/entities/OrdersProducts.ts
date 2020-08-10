import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('order_products')
class OrdersProducts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(_type => Order, order => order.order_products)
  order: Order;

  @ManyToOne(_type => Product, product => product.order_products)
  product: Product;

  @Column('uuid')
  product_id: string;

  @Column('uuid')
  order_id: string;

  @Column('float')
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default OrdersProducts;
