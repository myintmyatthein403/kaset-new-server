import { PartialType } from '@nestjs/swagger';
import { CreateDingerLogDto } from './create-dinger-log.dto';

export class UpdateDingerLogDto extends PartialType(CreateDingerLogDto) {}
