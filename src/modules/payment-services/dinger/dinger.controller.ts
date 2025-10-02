import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DingerService } from './dinger.service';
import { CreateDingerDto } from './dto/create-dinger.dto';
import { UpdateDingerDto } from './dto/update-dinger.dto';

@Controller('dinger')
export class DingerController {
  constructor(private readonly dingerService: DingerService) { }

}
