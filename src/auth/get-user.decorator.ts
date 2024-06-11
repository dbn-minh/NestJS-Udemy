import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

// export const GetUser = createParamDecorator((data, req): User => {
//   return req.user;
// });

// New way
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
