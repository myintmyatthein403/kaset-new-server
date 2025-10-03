import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Track } from '../track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Collection, ApiToken, Track
    ])
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, ApiKeyGuard],
})
export class CollectionsModule { }
