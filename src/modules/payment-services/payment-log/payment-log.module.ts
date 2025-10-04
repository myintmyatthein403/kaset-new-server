import { Module } from '@nestjs/common';
import { PaymentLogService } from './payment-log.service';
import { PaymentLogController } from './payment-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentLog } from './entities/payment-log.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PaymentLog
    ])
  ],
  controllers: [PaymentLogController],
  providers: [PaymentLogService],
  exports: [PaymentLogService]
})
export class PaymentLogModule { }
