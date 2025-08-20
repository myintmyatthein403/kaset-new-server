import { PartialType } from '@nestjs/swagger';
import { CreateDataCollectDto } from './create-data-collect.dto';

export class UpdateDataCollectDto extends PartialType(CreateDataCollectDto) {}
