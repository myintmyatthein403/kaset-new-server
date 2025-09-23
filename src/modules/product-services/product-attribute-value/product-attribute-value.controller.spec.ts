import { Test, TestingModule } from '@nestjs/testing';
import { ProductAttributeValueController } from './product-attribute-value.controller';
import { ProductAttributeValueService } from './product-attribute-value.service';

describe('ProductAttributeValueController', () => {
  let controller: ProductAttributeValueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductAttributeValueController],
      providers: [ProductAttributeValueService],
    }).compile();

    controller = module.get<ProductAttributeValueController>(ProductAttributeValueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
