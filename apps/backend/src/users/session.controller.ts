import { Body, Controller, Delete, Get, Post, Session } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { SessionService } from "./session.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { Session as FastifySession } from "@fastify/secure-session";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a session (sign in, log in, ..)" })
  create(@Body() credentials: CreateSessionDto, @Session() session: FastifySession) {
    return this.sessionService.signIn(credentials, session);
  }

  @Get()
  @ApiOperation({ summary: "Get the current session (who am I, ..)" })
  get(@Session() session: FastifySession) {
    return this.sessionService.whoAmI(session.get("userId"));
  }

  @Delete()
  @ApiOperation({ summary: "Delete a session (sign out, log out, ..)" })
  delete(@Session() session: FastifySession) {
    session.delete();
  }
}
