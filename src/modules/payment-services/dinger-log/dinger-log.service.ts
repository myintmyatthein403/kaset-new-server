import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDingerLogDto } from './dto/create-dinger-log.dto';
import { UpdateDingerLogDto } from './dto/update-dinger-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DingerLog } from './entities/dinger-log.entity';
import { Repository } from 'typeorm';
import { PAYMENT_STATUS } from 'src/common/enums/enums';

@Injectable()
export class DingerLogService {
  constructor(
    @InjectRepository(DingerLog)
    private readonly dingerLogRepository: Repository<DingerLog>,
  ) { }
  create(createDingerLogDto: CreateDingerLogDto) {
    return 'This action adds a new dingerLog';
  }

  findAll() {
    return `This action returns all dingerLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dingerLog`;
  }

  update(id: number, updateDingerLogDto: UpdateDingerLogDto) {
    return `This action updates a #${id} dingerLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} dingerLog`;
  }

  async createDingerLog(sessionId: string, data: any) {
    const stripeLog = await this.dingerLogRepository.findOne({
      where: {
        transactionNum: sessionId,
        status: PAYMENT_STATUS.PENDING,
      }
    })

    if (!stripeLog) {
      throw new BadRequestException(`Session not found or already processed`)
    } else {
      const newStripeLog = this.dingerLogRepository.create({
        transactionNum: sessionId,
        orderId: stripeLog.orderId,
        customerId: stripeLog.customerId,
        ...data,
      })
      return await this.dingerLogRepository.save(newStripeLog);
    }
  }

}
