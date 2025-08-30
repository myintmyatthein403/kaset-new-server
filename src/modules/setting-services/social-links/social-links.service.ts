import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { SocialLink } from './entities/social-link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SocialLinksService extends BaseService<SocialLink> {
  constructor(
    @InjectRepository(SocialLink)
    private readonly socialLinkRepository: Repository<SocialLink>,
  ) {
    super(socialLinkRepository)
  }
}
