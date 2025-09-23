import { Module } from '@nestjs/common';
import { HomeSlideShowService } from './home-slide-show.service';
import { HomeSlideShowController } from './home-slide-show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeSlideShow } from './entities/home-slide-show.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [HomeSlideShow, ApiToken]
    )
  ],
  controllers: [HomeSlideShowController],
  providers: [HomeSlideShowService, ApiKeyGuard],
})
export class HomeSlideShowModule { }
