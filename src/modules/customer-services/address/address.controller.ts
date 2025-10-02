import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { BaseController } from 'src/common/base/base.controller';
import { Address } from './entities/address.entity';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Controller('address')
export class AddressController extends BaseController<Address> {
  constructor(private readonly addressService: AddressService) { super(addressService) }

  @UseGuards(JwtAuthGuard)
  @Get('/slug/me')
  async findOneBySlug(
    @Req() req: any
  ) {
    const user = req.user;
    return this.addressService.findMyAddresses(user.sub);
  }
}
