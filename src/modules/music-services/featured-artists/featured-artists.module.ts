import { Module } from '@nestjs/common';
import { FeaturedArtistsService } from './featured-artists.service';
import { FeaturedArtistsController } from './featured-artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturedArtist } from './entities/featured-artist.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { User } from 'src/modules/user-services/user/entities/user.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeaturedArtist,
      ApiToken,
      User
    ])
  ],
  controllers: [FeaturedArtistsController],
  providers: [FeaturedArtistsService, ApiKeyGuard],
})
export class FeaturedArtistsModule { }
