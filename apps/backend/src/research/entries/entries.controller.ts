import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { EntriesService } from "./entries.service";
import { EntryCreationDto, EntryResponseDto, EntryMutationDto } from "./entry.dto";
import { Serialize } from "../../common/decorators/serialize";

@ApiTags("Entries")
@Controller("entries")
export class EntriesController {
  constructor(private readonly entriesService: EntriesService) {}

  @Post()
  @ApiOperation({ summary: "Create a entry" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  @Serialize(EntryResponseDto)
  create(@Body() entry: EntryCreationDto): Promise<EntryResponseDto> {
    return this.entriesService.create(entry);
  }

  @Get()
  @ApiOperation({ summary: "Get all entries" })
  @Serialize(EntryResponseDto)
  index(): Promise<EntryResponseDto[]> {
    return this.entriesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a entry by ID" })
  @Serialize(EntryResponseDto)
  get(@Param("id") id: string): Promise<EntryResponseDto> {
    return this.entriesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a entry by ID" })
  @Serialize(EntryResponseDto)
  update(@Param("id") id: string, @Body() entry: EntryMutationDto): Promise<EntryResponseDto> {
    return this.entriesService.update(+id, entry);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a entry by ID" })
  delete(@Param("id") id: string) {
    return this.entriesService.remove(+id);
  }
}
