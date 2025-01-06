import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ParticipantsService } from "./participants.service";
import {
  ApiBody,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
  getSchemaPath,
} from "@nestjs/swagger";
import { ParticipantCreationDto, ParticipantMutationDto, ParticipantResponseDto } from "./participant.dto";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { QuestionnairesService } from "../questionnaires/questionnaires.service";
import { OneOrMany } from "../../types";
import { EntriesService } from "../entries/entries.service";
import { EntryTemplateDto } from "../entries/entry.dto";

@ApiTags("Participants")
@ApiExtraModels(ParticipantCreationDto)
@Controller("participants")
export class ParticipantsController {
  constructor(
    private readonly participantService: ParticipantsService,
    private readonly questionnairesService: QuestionnairesService,
    private readonly entriesService: EntriesService
  ) {}

  @Post()
  @ApiOperation({ summary: "Create a participant" })
  @ApiUnprocessableEntityResponse({ description: "Unique id constraint violation", type: ErrorResponseDto })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(ParticipantCreationDto) },
        {
          type: "array",
          items: { $ref: getSchemaPath(ParticipantCreationDto) },
        },
      ],
    },
    examples: {
      single: { value: { id: 1, birthday: "2024-11-01T00:05:02.718Z" } },
      multiple: {
        value: [
          { id: 1, birthday: "2024-11-01T00:05:02.718Z" },
          { id: 2, birthday: "2024-11-01T00:05:02.718Z" },
        ],
      },
    },
  })
  create(@Body() participant: OneOrMany<ParticipantCreationDto>): Promise<ParticipantResponseDto[]> {
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
  async get(@Param("id") id: string): Promise<ParticipantResponseDto> {
    const participant = await this.participantService.findOne(+id);
    const latestQuestionnaire = (await this.questionnairesService.findLatestByParticipant(+id))?.toObject();
    return { ...participant, latestQuestionnaire };
  }

  @Get(":id/entry-templates")
  @ApiOperation({ summary: "Get a participant by ID" })
  @ApiNotFoundResponse({ description: "Entity not found exception", type: ErrorResponseDto })
  entryTemplates(@Param("id") id: string): Promise<EntryTemplateDto[]> {
    return this.entriesService.findTemplatesForParticipant(+id);
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
