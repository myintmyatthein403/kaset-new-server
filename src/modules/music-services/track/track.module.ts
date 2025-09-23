import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { Genre } from '../genres/entities/genre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, ApiToken, User, Genre])
  ],
  controllers: [TrackController],
  providers: [TrackService, ApiKeyGuard],
})
export class TrackModule { }
