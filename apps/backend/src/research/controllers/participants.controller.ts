import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ParticipantsService } from "../services/participants.service";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "src/common/dto/error-response.dto";
import { ParticipantCreationDto } from "../dto/participant-creation.dto";
import { ParticipantResponseDto } from "../dto/participant-response.dto";
import { Roles } from "src/users/decorators/roles.decorator";
import { UserRole } from "src/users/entities/user.entity";
import { ParticipantMutationDto } from "../dto/participant-mutation.dto";

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
