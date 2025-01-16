import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { bcryptVerify } from "hash-wasm";
import { SessionCreationDto } from "./session.dto";
import { ConfigService } from "../../config/config.service";

const INVALID_CREDENTIALS_EXCEPTION = new UnauthorizedException("Provided credentials are invalid", "Unauthorized");

@Injectable()
export class SessionService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService
  ) {}

  async validate({ email, password }: SessionCreationDto) {
    try {
      const user = await this.usersService.findForAuthentication(email);

      if (await bcryptVerify({ password, hash: user.password })) {
        return { ...user, expiresAt: Math.floor(Date.now() / 1000) + this.configService.get("auth.expiry") };
      }
      throw INVALID_CREDENTIALS_EXCEPTION;
    } catch {
      throw INVALID_CREDENTIALS_EXCEPTION;
    }
  }

  async find(userId?: number) {
    if (!userId) throw new UnauthorizedException();
    return await this.usersService.findOne(userId);
  }
}
