import { PartialType } from '@nestjs/swagger';
import { CreateSocialMediaLinkDto } from './create-social-media-link.dto';

export class UpdateSocialMediaLinkDto extends PartialType(CreateSocialMediaLinkDto) {}
