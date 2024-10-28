import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { UsersService } from "../users.service";
import { instanceToInstance } from "class-transformer";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../../common/decorators/public.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const userId = request.session.get("userId");

    try {
      const user = await this.usersService.findOne(userId);
      request.user = instanceToInstance(user);

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
