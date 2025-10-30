import { PartialType } from '@nestjs/swagger';
import { CreateCreditValueDto } from './create-credit-value.dto';

export class UpdateCreditValueDto extends PartialType(CreateCreditValueDto) {}
