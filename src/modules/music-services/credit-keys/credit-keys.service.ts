import { Injectable } from '@nestjs/common';
import { CreateCreditKeyDto } from './dto/create-credit-key.dto';
import { UpdateCreditKeyDto } from './dto/update-credit-key.dto';
import { BaseService } from 'src/common/base/base.service';
import { CreditKey } from './entities/credit-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreditKeysService extends BaseService<CreditKey> {
  constructor(
    @InjectRepository(CreditKey)
    private readonly creditKeyRepository: Repository<CreditKey>,
  ) {
    super(creditKeyRepository)
  }
}
