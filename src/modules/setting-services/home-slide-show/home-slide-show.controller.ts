import { Controller } from '@nestjs/common';
import { HomeSlideShowService } from './home-slide-show.service';
import { BaseController } from 'src/common/base/base.controller';
import { HomeSlideShow } from './entities/home-slide-show.entity';

@Controller('home-slide-show')
export class HomeSlideShowController extends BaseController<HomeSlideShow> {
  constructor(private readonly homeSlideShowService: HomeSlideShowService) { super(homeSlideShowService) }
}
