import { InjectRepository } from "@mikro-orm/nestjs";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "src/entities/user.entity";
import { AuthService } from "./auth.service";
import { SessionCreateResponse } from "./session.dto";
import { SessionUser } from "./user.decorator";

@Controller("/session")
export class SessionController {
  constructor(
    @InjectRepository(User)
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard("local"))
  @Post()
  async login(@SessionUser() user: User): Promise<SessionCreateResponse> {
    return { accessToken: await this.authService.login(user) };
  }
}
