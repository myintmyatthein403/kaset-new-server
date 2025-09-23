import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Track } from '../track/entities/track.entity';
import { User } from 'src/modules/user-services/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Album, ApiToken, User, Track
    ])
  ],
  controllers: [AlbumController],
  providers: [AlbumService, ApiKeyGuard],
})
export class AlbumModule { }
