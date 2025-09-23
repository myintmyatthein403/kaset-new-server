import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ExchangeRate } from './entities/exchange-rate.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeRateService extends BaseService<ExchangeRate> {
  constructor(
    @InjectRepository(ExchangeRate)
    private readonly exchangeRateRepository: Repository<ExchangeRate>,
  ) {
    super(exchangeRateRepository)
  }
}
