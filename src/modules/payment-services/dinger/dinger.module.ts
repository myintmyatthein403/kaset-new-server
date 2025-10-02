import { Module } from '@nestjs/common';
import { DingerService } from './dinger.service';
import { DingerController } from './dinger.controller';

@Module({
  controllers: [DingerController],
  providers: [DingerService],
  exports: [DingerService]
})
export class DingerModule { }
