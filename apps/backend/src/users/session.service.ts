import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { bcryptVerify } from "hash-wasm";
import { JwtService } from "@nestjs/jwt";
import { User } from "./entities/user.entity";

@Injectable()
export class SessionService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findBy({ email });

    if (!user && (await bcryptVerify({ password, hash: user.password }))) return user;

    return null;
  }

  signIn(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
