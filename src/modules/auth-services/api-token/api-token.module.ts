import { Module } from '@nestjs/common';
import { ApiTokenService } from './api-token.service';
import { ApiTokenController } from './api-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiToken } from './entities/api-token.entity';
import { TokenModule } from 'src/common/services/token/token.module';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { JwtOrApiKeyGuard } from 'src/common/guards/jwt-or-api-key.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApiToken
    ]),
    TokenModule
  ],
  controllers: [ApiTokenController],
  providers: [ApiTokenService, JwtAuthGuard, ApiKeyGuard, JwtOrApiKeyGuard],
})
export class ApiTokenModule { }
