import { PartialType } from '@nestjs/swagger';
import { CreateHomeSlideShowDto } from './create-home-slide-show.dto';

export class UpdateHomeSlideShowDto extends PartialType(CreateHomeSlideShowDto) {}
