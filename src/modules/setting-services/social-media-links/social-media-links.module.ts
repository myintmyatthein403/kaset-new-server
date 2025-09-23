import { Module } from '@nestjs/common';
import { SocialMediaLinksService } from './social-media-links.service';
import { SocialMediaLinksController } from './social-media-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialMediaLink } from './entities/social-media-link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialMediaLink
    ])
  ],
  controllers: [SocialMediaLinksController],
  providers: [SocialMediaLinksService],
})
export class SocialMediaLinksModule { }
