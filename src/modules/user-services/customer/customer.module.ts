import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { TokenModule } from 'src/common/services/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer, ApiToken
    ]),
    TokenModule
  ],
  controllers: [CustomerController],
  providers: [CustomerService, ApiKeyGuard],
})
export class CustomerModule { }
