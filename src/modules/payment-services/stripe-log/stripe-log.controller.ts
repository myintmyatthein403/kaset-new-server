import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StripeLogService } from './stripe-log.service';
import { CreateStripeLogDto } from './dto/create-stripe-log.dto';
import { UpdateStripeLogDto } from './dto/update-stripe-log.dto';

@Controller('stripe-log')
export class StripeLogController {
  constructor(private readonly stripeLogService: StripeLogService) {}

  @Post()
  create(@Body() createStripeLogDto: CreateStripeLogDto) {
    return this.stripeLogService.create(createStripeLogDto);
  }

  @Get()
  findAll() {
    return this.stripeLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stripeLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStripeLogDto: UpdateStripeLogDto) {
    return this.stripeLogService.update(+id, updateStripeLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stripeLogService.remove(+id);
  }
}
