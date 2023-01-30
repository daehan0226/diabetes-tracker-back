import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
  handleRequest(err, user, info) {
    console.log(user, info)
      
      if (err || !user) {
          throw err;
      }
      return user;
  }
}
