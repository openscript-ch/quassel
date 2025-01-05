import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { EntriesService } from "./entries.service";
import { EntryCreationDto, EntryResponseDto, EntryMutationDto } from "./entry.dto";

@ApiTags("Entries")
@Controller("entries")
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a entry" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  create(@Body() entry: EntryCreationDto): Promise<EntryResponseDto> {
    return this.entriesService.create(entry);
  }

  @Get()
  @ApiOperation({ summary: "Get all entries" })
  index(): Promise<EntryResponseDto[]> {
    return this.entriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a entry by ID" })
  get(@Param("id") id: string): Promise<EntryResponseDto> {
    return this.entriesService.findOne(+id);
  }

  @Get("unique-groups/:participantId")
  @ApiOperation({ summary: "Get all entries" })
  uniqueGroups(@Param("participantId") participantId: string): Promise<EntryResponseDto[]> {
    return this.entriesService.findUniqueEntriesByParticipant(participantId);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a entry by ID" })
  update(@Param("id") id: string, @Body() entry: EntryMutationDto): Promise<EntryResponseDto> {
    return this.entriesService.update(+id, entry);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a entry by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.entriesService.remove(+id);
  }
}
