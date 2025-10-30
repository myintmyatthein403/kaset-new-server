import { Module } from '@nestjs/common';
import { CreditKeysService } from './credit-keys.service';
import { CreditKeysController } from './credit-keys.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditKey } from './entities/credit-key.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CreditKey, ApiToken
    ])
  ],
  controllers: [CreditKeysController],
  providers: [CreditKeysService, ApiKeyGuard],
})
export class CreditKeysModule { }
