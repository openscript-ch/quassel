import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { bcryptVerify } from "hash-wasm";
import { SessionCreationDto } from "./dto/session-creation.dto";
import { Session as FastifySession } from "@fastify/secure-session";

const INVALID_CREDENTIALS_EXCEPTION = new UnauthorizedException("Provided credentials are invalid", "Unauthorized");

@Injectable()
export class SessionService {
  constructor(private usersService: UsersService) {}

  async signIn({ email, password }: SessionCreationDto, session: FastifySession) {
    try {
      const user = await this.usersService.findBy({ email });

      if (await bcryptVerify({ password, hash: user.password })) {
        session.set("userId", user.id);
        return user;
      }
      throw INVALID_CREDENTIALS_EXCEPTION;
    } catch {
      throw INVALID_CREDENTIALS_EXCEPTION;
    }
  }

  async whoAmI(userId: number) {
    try {
      return await this.usersService.findOne(userId);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
