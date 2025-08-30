import { Controller } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseController } from 'src/common/base/base.controller';
import { Address } from './entities/address.entity';

@Controller('address')
export class AddressController extends BaseController<Address> {
  constructor(private readonly addressService: AddressService) { super(addressService) }

}
