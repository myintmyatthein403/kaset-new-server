import { CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { BaseEntity } from '../base/base.entity';

export abstract class BaseOwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false; // Not authenticated
    }

    const resource = await this.getResource(user.user_id);

    if (!resource || resource.id !== user.id) {
      throw new ForbiddenException('You do not have permission to access this resource.');
    }

    return true;
  }

  // Abstract method that must be implemented by concrete guards
  protected abstract getResource(id: string): Promise<BaseEntity | undefined>;
}
