import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { SocialLinksController } from './social-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialLink } from './entities/social-link.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [SocialLink]
    )
  ],
  controllers: [SocialLinksController],
  providers: [SocialLinksService],
})
export class SocialLinksModule { }
