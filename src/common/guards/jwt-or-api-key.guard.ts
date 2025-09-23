import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from './api-key.guard';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtOrApiKeyGuard extends AuthGuard('jwt') {
  constructor(
    private readonly apiKeyGuard: ApiKeyGuard,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      // Step 1: Attempt to activate with the JWT Guard's logic.
      // This will throw an error if the JWT is invalid or missing.

      return (await super.canActivate(context)) as boolean;
    } catch (e) {
      // Step 2: If the JWT activation fails, try to activate with the ApiKeyGuard.
      try {
        const canActivateWithApiKey =
          await this.apiKeyGuard.canActivate(context);

        if (canActivateWithApiKey) {
          return true;
        }
      } catch (apiKeyError) {
        console.log('api key error', apiKeyError);
        // If both guards fail, throw a final UnauthorizedException.
        throw new UnauthorizedException('Invalid JWT or API Key provided.');
      }
    }
    // This line should technically be unreachable, but it's a good practice to handle all branches.
    return false;
  }
}
