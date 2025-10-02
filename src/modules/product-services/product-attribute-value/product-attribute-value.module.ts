import { Module } from '@nestjs/common';
import { ProductAttributeValueService } from './product-attribute-value.service';
import { ProductAttributeValueController } from './product-attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAttributeValue, ApiToken
    ])
  ],
  controllers: [ProductAttributeValueController],
  providers: [ProductAttributeValueService, ApiKeyGuard],
})
export class ProductAttributeValueModule { }
