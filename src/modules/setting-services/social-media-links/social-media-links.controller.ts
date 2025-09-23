import { Controller } from '@nestjs/common';
import { SocialMediaLinksService } from './social-media-links.service';
import { BaseController } from 'src/common/base/base.controller';
import { SocialMediaLink } from './entities/social-media-link.entity';

@Controller('social-media-links')
export class SocialMediaLinksController extends BaseController<SocialMediaLink> {
  constructor(private readonly socialMediaLinksService: SocialMediaLinksService) { super(socialMediaLinksService) }
}
