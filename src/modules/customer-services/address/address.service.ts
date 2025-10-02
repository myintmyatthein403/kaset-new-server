import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Address } from './entities/address.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address)
    private readonly addressService: Repository<Address>,
  ) {
    super(addressService)
  }

  async findMyAddresses(userId: string) {
    return this.addressService.find({ where: { customer: { id: userId } } });
  }
}
