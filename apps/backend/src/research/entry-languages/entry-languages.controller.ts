import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { EntryLanguageCreationDto, EntryLanguageResponseDto, EntryLanguageMutationDto } from "./entry-language.dto";
import { EntryLanguagesService } from "./entry-languages.service";

@ApiTags("Entry Languages")
@Controller("entry-languages")
export class EntryLanguagesController {
  constructor(private readonly entryLanguagesService: EntryLanguagesService) {}

  @Post()
  @ApiOperation({ summary: "Create an entry language" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  create(@Body() language: EntryLanguageCreationDto): Promise<EntryLanguageResponseDto> {
    return this.entryLanguagesService.create(language);
  }

  @Get()
  @ApiOperation({ summary: "Get all entry languages" })
  index(): Promise<EntryLanguageResponseDto[]> {
    return this.entryLanguagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get an entry language by ID" })
  get(@Param("id") id: string): Promise<EntryLanguageResponseDto> {
    return this.entryLanguagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update an entry language by ID" })
  update(@Param("id") id: string, @Body() language: EntryLanguageMutationDto): Promise<EntryLanguageResponseDto> {
    return this.entryLanguagesService.update(+id, language);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete an entry language by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.entryLanguagesService.remove(+id);
  }
}
