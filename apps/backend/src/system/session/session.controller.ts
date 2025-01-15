import { Body, Controller, Delete, Get, HttpCode, Post, Session, UnauthorizedException } from "@nestjs/common";
import { ApiNoContentResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { SessionService } from "./session.service";
import { Session as FastifySession } from "@fastify/secure-session";
import { Public } from "./public.decorator";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { CustomApiUnauthorizedResponse } from "../../common/decorators/custom-api-unauthorized-response";
import { SessionCreationDto, SessionResponseDto } from "./session.dto";
import { Serialize } from "../../common/decorators/serialize";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a session (sign in, log in, ..)" })
  @ApiResponse({ status: 201, description: "Signed in", type: SessionResponseDto })
  @ApiUnauthorizedResponse({ description: "Provided credentials are invalid", type: ErrorResponseDto })
  @Serialize(SessionResponseDto)
  create(@Body() credentials: SessionCreationDto, @Session() session: FastifySession) {
    return this.sessionService.signIn(credentials, session);
  }

  @Get()
  @ApiOperation({ summary: "Get the current session (who am I, ..)" })
  @ApiResponse({ status: 200, description: "Current session", type: SessionResponseDto })
  @ApiUnauthorizedResponse({ description: "Provided credentials are invalid", type: ErrorResponseDto })
  @Serialize(SessionResponseDto)
  get(@Session() session: FastifySession) {
    const userId = session.get("userId");
    if (!userId) throw new UnauthorizedException();
    return this.sessionService.whoAmI(userId);
  }

  @Delete()
  @HttpCode(204)
  @ApiOperation({
    summary: "Delete a session (sign out, log out, ..)",
  })
  @ApiNoContentResponse({ description: "Signed out" })
  @CustomApiUnauthorizedResponse()
  delete(@Session() session: FastifySession) {
    session.delete();
  }
}
