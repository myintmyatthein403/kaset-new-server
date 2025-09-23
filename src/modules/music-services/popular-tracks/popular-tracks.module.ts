import { Module } from '@nestjs/common';
import { PopularTracksService } from './popular-tracks.service';
import { PopularTracksController } from './popular-tracks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopularTrack } from './entities/popular-track.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Track } from '../track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [PopularTrack, ApiToken, Track]
    )
  ],
  controllers: [PopularTracksController],
  providers: [PopularTracksService, ApiKeyGuard],
})
export class PopularTracksModule { }
