import { PartialType } from '@nestjs/swagger';
import { CreateMusicLinkDto } from './create-music-link.dto';

export class UpdateMusicLinkDto extends PartialType(CreateMusicLinkDto) {}
