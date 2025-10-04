import { Module } from '@nestjs/common';
import { StripeLogService } from './stripe-log.service';
import { StripeLogController } from './stripe-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeLog } from './entities/stripe-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StripeLog
    ])
  ],
  controllers: [StripeLogController],
  providers: [StripeLogService],
  exports: [StripeLogService]
})
export class StripeLogModule { }
