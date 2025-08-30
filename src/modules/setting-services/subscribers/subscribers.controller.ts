import { Controller } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { BaseController } from 'src/common/base/base.controller';
import { Subscriber } from './entities/subscriber.entity';

@Controller('subscribers')
export class SubscribersController extends BaseController<Subscriber> {
  constructor(private readonly subscribersService: SubscribersService) { super(subscribersService) }
}
