import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { bcryptVerify } from "hash-wasm";
import { CreateSessionDto } from "./dto/create-session.dto";
import { Session as FastifySession } from "@fastify/secure-session";

@Injectable()
export class SessionService {
  constructor(private usersService: UsersService) {}

  async signIn({ email, password }: CreateSessionDto, session: FastifySession) {
    try {
      const user = await this.usersService.findBy({ email });

      if (await bcryptVerify({ password, hash: user.password })) {
        session.set("userId", user.id);
        return user;
      }
      return new UnauthorizedException();
    } catch {
      return new UnauthorizedException();
    }
  }

  async whoAmI(userId: number) {
    try {
      return await this.usersService.findOne(userId);
    } catch {
      return new UnauthorizedException();
    }
  }
}
