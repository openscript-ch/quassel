import { Body, Controller, Delete, Get, Post, Session } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, OmitType } from "@nestjs/swagger";
import { SessionService } from "./session.service";
import { CreateSessionDto } from "./dto/create-session.dto";
import { Session as FastifySession } from "@fastify/secure-session";
import { Public } from "./decorators/public.decorator";
import { User } from "./entities/user.entity";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a session (sign in, log in, ..)" })
  @ApiResponse({ status: 201, description: "Successful sign in", type: OmitType(User, ["password"]) })
  @ApiResponse({ status: 401, description: "Invalid credentials" })
  create(@Body() credentials: CreateSessionDto, @Session() session: FastifySession) {
    return this.sessionService.signIn(credentials, session);
  }

  @Get()
  @ApiOperation({ summary: "Get the current session (who am I, ..)" })
  @ApiResponse({ status: 200, description: "Current session" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  get(@Session() session: FastifySession) {
    return this.sessionService.whoAmI(session.get("userId"));
  }

  @Delete()
  @ApiOperation({ summary: "Delete a session (sign out, log out, ..)" })
  @ApiResponse({ status: 204, description: "Successful sign out" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  delete(@Session() session: FastifySession) {
    session.delete();
  }
}
