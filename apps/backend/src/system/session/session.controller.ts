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
  async create(@Body() credentials: SessionCreationDto, @Session() session: FastifySession) {
    const user = await this.sessionService.validate(credentials);
    session.set("userId", user.id);
    return user;
  }

  @Get()
  @ApiOperation({ summary: "Get the current session (who am I, ..)" })
  @ApiResponse({ status: 200, description: "Current session", type: SessionResponseDto })
  @ApiUnauthorizedResponse({ description: "Provided credentials are invalid", type: ErrorResponseDto })
  @Serialize(SessionResponseDto)
  async get(@Session() session: FastifySession) {
    try {
      const userId = session.get("userId");
      return this.sessionService.find(userId);
    } catch {
      session.delete();
      throw new UnauthorizedException();
    }
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
