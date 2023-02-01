import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProfileDto } from 'src/modules/auth/dtos/Profile.dto';

export const AuthUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ProfileDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
