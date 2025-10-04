import { PartialType } from '@nestjs/swagger';
import { CreateStripeLogDto } from './create-stripe-log.dto';

export class UpdateStripeLogDto extends PartialType(CreateStripeLogDto) {}
