import { Module } from '@nestjs/common';
import { LogoService } from './logo.service';
import { LogoController } from './logo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logo } from './entities/logo.entity';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Logo, ApiToken
    ])
  ],
  controllers: [LogoController],
  providers: [LogoService, ApiKeyGuard],
})
export class LogoModule { }
