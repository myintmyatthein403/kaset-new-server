import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Faq } from './entities/faq.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService extends BaseService<Faq> {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {
    super(faqRepository)
  }
}
