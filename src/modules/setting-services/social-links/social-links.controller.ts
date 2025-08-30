import { Controller } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { BaseController } from 'src/common/base/base.controller';
import { SocialLink } from './entities/social-link.entity';

@Controller('social-links')
export class SocialLinksController extends BaseController<SocialLink> {
  constructor(private readonly socialLinksService: SocialLinksService) { super(socialLinksService) }
}
