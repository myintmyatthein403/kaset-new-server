import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DingerLogService } from './dinger-log.service';
import { CreateDingerLogDto } from './dto/create-dinger-log.dto';
import { UpdateDingerLogDto } from './dto/update-dinger-log.dto';

@Controller('dinger-log')
export class DingerLogController {
  constructor(private readonly dingerLogService: DingerLogService) {}

  @Post()
  create(@Body() createDingerLogDto: CreateDingerLogDto) {
    return this.dingerLogService.create(createDingerLogDto);
  }

  @Get()
  findAll() {
    return this.dingerLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dingerLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDingerLogDto: UpdateDingerLogDto) {
    return this.dingerLogService.update(+id, updateDingerLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dingerLogService.remove(+id);
  }
}
