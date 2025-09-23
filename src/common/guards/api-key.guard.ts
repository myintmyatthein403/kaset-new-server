import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiToken } from 'src/modules/auth-services/api-token/entities/api-token.entity';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @InjectRepository(ApiToken)
    private readonly apiKeyRepository: Repository<ApiToken>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    console.log('apiKey', apiKey)

    if (!apiKey) {
      throw new UnauthorizedException('API Key not found');
    }

    const foundApiKey = await this.apiKeyRepository.findOne({ where: { key: apiKey, is_active: true } });
    console.log(foundApiKey)
    if (!foundApiKey) {
      throw new UnauthorizedException('Invalid or inactive API Key');
    }

    request.client = foundApiKey;

    return true;
  }
}
