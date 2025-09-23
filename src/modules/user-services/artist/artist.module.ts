import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaLink } from 'src/modules/setting-services/social-media-links/entities/social-media-link.entity';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { User } from '../user/entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialMediaLink,
      UserProfile,
      User,
      Role
    ])
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule { }
