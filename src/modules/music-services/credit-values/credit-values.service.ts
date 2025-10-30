import { Injectable } from '@nestjs/common';
import { CreateCreditValueDto } from './dto/create-credit-value.dto';
import { UpdateCreditValueDto } from './dto/update-credit-value.dto';
import { BaseService } from 'src/common/base/base.service';
import { CreditValue } from './entities/credit-value.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreditValuesService extends BaseService<CreditValue> {
  constructor(
    @InjectRepository(CreditValue)
    private readonly creditValueRepository: Repository<CreditValue>,
  ) {
    super(creditValueRepository);
  }
}
