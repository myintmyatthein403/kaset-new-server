import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { ProductAttributeController } from './product-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductAttribute, ApiToken
    ])
  ],
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService, ApiKeyGuard],
})
export class ProductAttributeModule { }
