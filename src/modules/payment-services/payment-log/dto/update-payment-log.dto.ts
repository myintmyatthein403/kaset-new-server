import { PartialType } from '@nestjs/swagger';
import { CreatePaymentLogDto } from './create-payment-log.dto';

export class UpdatePaymentLogDto extends PartialType(CreatePaymentLogDto) {}
