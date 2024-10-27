import { Controller, Delete, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { LocalGuard } from "./local.guard";
import { SessionService } from "./session.service";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @UseGuards(LocalGuard)
  @Post()
  async create(@Request() req) {
    return this.sessionService.signIn(req.user);
  }

  @UseGuards(LocalGuard)
  @Delete()
  async delete(@Request() req) {
    return req.logout();
  }
}
