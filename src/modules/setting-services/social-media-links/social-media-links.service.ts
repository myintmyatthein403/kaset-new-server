import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { SocialMediaLink } from './entities/social-media-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SocialMediaLinksService extends BaseService<SocialMediaLink> {
  constructor(
    @InjectRepository(SocialMediaLink)
    private readonly socialMediaLinkRepository: Repository<SocialMediaLink>,
  ) {
    super(socialMediaLinkRepository)
  }
}
