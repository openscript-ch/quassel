import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionGuard implements CanActivate {
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

    if (!userId) {
      throw new UnauthorizedException();
    }

    try {
      const user = await this.usersService.findOne(userId);
      request.user = user;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
