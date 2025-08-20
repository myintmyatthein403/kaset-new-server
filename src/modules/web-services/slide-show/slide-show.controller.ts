import { Controller } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';
import { BaseController } from 'src/common/base/base.controller';
import { SlideShow } from './entities/slide-show.entity';

@Controller('slide-show')
export class SlideShowController extends BaseController<SlideShow> {
  constructor(private readonly slideShowService: SlideShowService) { super(slideShowService) }

}
