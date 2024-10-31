import { Body, Controller, Delete, Get, HttpCode, Post, Session } from "@nestjs/common";
import { ApiNoContentResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { SessionService } from "../services/session.service";
import { SessionCreationDto } from "../dto/session-creation.dto";
import { Session as FastifySession } from "@fastify/secure-session";
import { Public } from "../decorators/public.decorator";
import { SessionResponseDto } from "../dto/session-response.dto";
import { ErrorResponseDto } from "../../common/dto/error-response.dto";
import { CustomApiUnauthorizedResponse } from "../../common/decorators/custom-api-unauthorized-response";

@ApiTags("Session")
@Controller("session")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Public()
  @Post()
  @ApiOperation({ summary: "Create a session (sign in, log in, ..)" })
  @ApiResponse({ status: 201, description: "Signed in", type: SessionResponseDto })
  @ApiUnauthorizedResponse({ description: "Provided credentials are invalid", type: ErrorResponseDto })
  create(@Body() credentials: SessionCreationDto, @Session() session: FastifySession) {
    return this.sessionService.signIn(credentials, session);
  }

  @Get()
  @ApiOperation({ summary: "Get the current session (who am I, ..)" })
  @ApiResponse({ status: 200, description: "Current session", type: SessionResponseDto })
  @ApiUnauthorizedResponse({ description: "Provided credentials are invalid", type: ErrorResponseDto })
  get(@Session() session: FastifySession) {
    return this.sessionService.whoAmI(session.get("userId"));
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
