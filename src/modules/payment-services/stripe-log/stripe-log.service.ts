import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStripeLogDto } from './dto/create-stripe-log.dto';
import { UpdateStripeLogDto } from './dto/update-stripe-log.dto';
import { PAYMENT_STATUS } from 'src/common/enums/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { StripeLog } from './entities/stripe-log.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StripeLogService {
  constructor(
    @InjectRepository(StripeLog)
    private readonly stripeLogRepository: Repository<StripeLog>,
  ) { }
  create(createStripeLogDto: CreateStripeLogDto) {
    return 'This action adds a new stripeLog';
  }

  findAll() {
    return `This action returns all stripeLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stripeLog`;
  }

  update(id: number, updateStripeLogDto: UpdateStripeLogDto) {
    return `This action updates a #${id} stripeLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} stripeLog`;
  }

  async createStripeLog(sessionId: string, status: PAYMENT_STATUS) {
    const stripeLog = await this.stripeLogRepository.findOne({
      where: {
        session: sessionId,
        status: PAYMENT_STATUS.PENDING,
      }
    })

    if (!stripeLog) {
      throw new BadRequestException(`Session not found or already processed`)
    } else {
      const newStripeLog = this.stripeLogRepository.create({
        session: sessionId,
        status: status,
        amount: stripeLog.amount,
        orderId: stripeLog.orderId,
        customerId: stripeLog.customerId,
      })
      return await this.stripeLogRepository.save(newStripeLog);
    }
  }
}
