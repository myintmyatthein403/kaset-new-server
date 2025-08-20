import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { SlideShow } from './entities/slide-show.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SlideShowService extends BaseService<SlideShow> {
  constructor(
    @InjectRepository(SlideShow)
    private readonly slideShowRepository: Repository<SlideShow>,
  ) {
    super(slideShowRepository);
  }
}
