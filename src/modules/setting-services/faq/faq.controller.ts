import { Controller } from '@nestjs/common';
import { FaqService } from './faq.service';
import { BaseController } from 'src/common/base/base.controller';
import { Faq } from './entities/faq.entity';

@Controller('faq')
export class FaqController extends BaseController<Faq> {
  constructor(private readonly faqService: FaqService) { super(faqService) }
}
