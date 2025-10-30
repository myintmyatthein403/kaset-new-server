import { PartialType } from '@nestjs/swagger';
import { CreateCreditKeyDto } from './create-credit-key.dto';

export class UpdateCreditKeyDto extends PartialType(CreateCreditKeyDto) {}
