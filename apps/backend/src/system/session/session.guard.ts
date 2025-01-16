import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../users/users.service";

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const userId = request.session.get("userId");
    const expiresAt = request.session.get("expiresAt");

    if (!userId || !expiresAt || expiresAt < Date.now() / 1000) {
      request.session.delete();
      throw new UnauthorizedException();
    }

    try {
      const user = await this.usersService.findOne(userId);
      request.user = user;

      request.session.set("expiresAt", Math.floor(Date.now() / 1000) + this.configService.get("auth.expiry"));

      return true;
    } catch {
      request.session.delete();
      throw new UnauthorizedException();
    }
  }
}
