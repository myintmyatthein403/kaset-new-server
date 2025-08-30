import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logo } from './entities/logo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Logo
    ])
  ],
  controllers: [LogoController],
  providers: [LogoService],
})
export class LogoModule { }
