import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // Assuming the user object is attached to request.user by the JwtAuthGuard
    console.log(request.paylaod)
    return request.user;
  },
);
