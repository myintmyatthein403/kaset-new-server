import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Subscriber } from './entities/subscriber.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubscribersService extends BaseService<Subscriber> {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
  ) {
    super(subscriberRepository)
  }
}
