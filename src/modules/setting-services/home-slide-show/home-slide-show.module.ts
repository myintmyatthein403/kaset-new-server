import { Module } from '@nestjs/common';
import { HomeSlideShowService } from './home-slide-show.service';
import { HomeSlideShowController } from './home-slide-show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeSlideShow } from './entities/home-slide-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [HomeSlideShow]
    )
  ],
  controllers: [HomeSlideShowController],
  providers: [HomeSlideShowService],
})
export class HomeSlideShowModule { }
