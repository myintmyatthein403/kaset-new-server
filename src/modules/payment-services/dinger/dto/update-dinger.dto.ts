import { PartialType } from '@nestjs/swagger';
import { CreateDingerDto } from './create-dinger.dto';

export class UpdateDingerDto extends PartialType(CreateDingerDto) {}
