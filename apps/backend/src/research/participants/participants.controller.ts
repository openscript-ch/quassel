import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import { ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ParticipantCreationDto, ParticipantMutationDto, ParticipantResponseDto } from "./participant.dto";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";

@ApiTags("Participants")
@Controller("participants")
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a participant" })
  @ApiUnprocessableEntityResponse({ description: "Unique id constraint violation", type: ErrorResponseDto })
  create(@Body() participant: ParticipantCreationDto): Promise<ParticipantResponseDto> {
    return this.participantService.create(participant);
  }

  @Get()
  @ApiOperation({ summary: "Get all participants" })
  index(): Promise<ParticipantResponseDto[]> {
    return this.participantService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a participant by ID" })
  @ApiNotFoundResponse({ description: "Entity not found exception", type: ErrorResponseDto })
  get(@Param("id") id: string): Promise<ParticipantResponseDto> {
    return this.participantService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a participant by ID" })
  update(@Param("id") id: string, @Body() participant: ParticipantMutationDto): Promise<ParticipantResponseDto> {
    return this.participantService.update(+id, participant);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a participant by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.participantService.remove(+id);
  }
}
