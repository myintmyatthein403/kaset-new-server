import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { CartItem } from './entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CartItemsService extends BaseService<CartItem> {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {
    super(cartItemRepository)
  }
}
