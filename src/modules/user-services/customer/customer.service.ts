import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ACCOUNT_STATUS } from 'src/common/enums/enums';
import { TokenService } from 'src/common/services/token/token.service';

@Injectable()
export class CustomerService extends BaseService<Customer> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,

    private readonly tokenService: TokenService,
  ) {
    super(customerRepository)
  }

  async customerLogin(data: any) {
    const { email } = data;
    const customer = await this.customerRepository.findOne({ where: { email } });

    if (!customer) {
      const newCustomer = this.customerRepository.create(data);
      const createdCustomer = await this.customerRepository.save(newCustomer);
      const payload = {
        sub: createdCustomer[0]?.id,
      }
      const refresh_token = this.tokenService.generateRefreshToken(payload)
      return {
        ...createdCustomer,
        jwt_token: refresh_token
      }
    }

    if (customer.status !== ACCOUNT_STATUS.ACTIVE) {
      throw new UnauthorizedException(`Account is ${customer.status}. Please contact support`)
    }
    const payload = {
      sub: customer.id,
    }
    const refresh_token = this.tokenService.generateRefreshToken(payload);
    return {
      ...customer,
      jwt_token: refresh_token
    }
  }
}
