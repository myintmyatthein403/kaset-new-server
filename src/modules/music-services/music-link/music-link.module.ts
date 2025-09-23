import { Module } from '@nestjs/common';
import { MusicLinkService } from './music-link.service';
import { MusicLinkController } from './music-link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicLink } from './entities/music-link.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MusicLink, ApiToken
    ])
  ],
  controllers: [MusicLinkController],
  providers: [MusicLinkService, ApiKeyGuard],
})
export class MusicLinkModule { }
