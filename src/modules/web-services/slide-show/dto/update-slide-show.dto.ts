import { PartialType } from '@nestjs/swagger';
import { CreateSlideShowDto } from './create-slide-show.dto';

export class UpdateSlideShowDto extends PartialType(CreateSlideShowDto) {}
