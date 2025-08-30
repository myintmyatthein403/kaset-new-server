import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { BaseController } from 'src/common/base/base.controller';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController extends BaseController<Order> {
  constructor(private readonly ordersService: OrdersService) { super(ordersService) }
}
