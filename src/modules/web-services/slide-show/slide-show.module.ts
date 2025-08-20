import { Module } from '@nestjs/common';
import { SlideShowService } from './slide-show.service';
import { SlideShowController } from './slide-show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlideShow } from './entities/slide-show.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SlideShow
    ])
  ],
  controllers: [SlideShowController],
  providers: [SlideShowService],
})
export class SlideShowModule { }
