import { Controller } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { BaseController } from 'src/common/base/base.controller';
import { OrderItem } from './entities/order-item.entity';

@Controller('order-items')
export class OrderItemsController extends BaseController<OrderItem> {
  constructor(private readonly orderItemsService: OrderItemsService) { super(orderItemsService) }
}
