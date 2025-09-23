import { PartialType } from '@nestjs/swagger';
import { CreatePopularTrackDto } from './create-popular-track.dto';

export class UpdatePopularTrackDto extends PartialType(CreatePopularTrackDto) {}
