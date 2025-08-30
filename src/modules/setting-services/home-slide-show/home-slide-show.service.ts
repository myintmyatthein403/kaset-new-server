import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { HomeSlideShow } from './entities/home-slide-show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HomeSlideShowService extends BaseService<HomeSlideShow> {
  constructor(
    @InjectRepository(HomeSlideShow)
    private readonly homeSlideShowRepository: Repository<HomeSlideShow>,
  ) {
    super(homeSlideShowRepository)
  }
}
