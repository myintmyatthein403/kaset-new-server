import { Module } from '@nestjs/common';
import { CreditValuesService } from './credit-values.service';
import { CreditValuesController } from './credit-values.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditValue } from './entities/credit-value.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditValue, ApiToken
    ])
  ],
  controllers: [CreditValuesController],
  providers: [CreditValuesService, ApiKeyGuard],
})
export class CreditValuesModule { }
