import {ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";
import {GqlExecutionContext} from "@nestjs/graphql";

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // todo: check if the token is access token, if not throw an error.
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
