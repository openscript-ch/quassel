import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { LanguagesService } from "./languages.service";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { LanguageCreationDto, LanguageResponseDto, LanguageMutationDto } from "./language.dto";
import { Serialize } from "../../common/decorators/serialize";

@ApiTags("Languages")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a language" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  @Serialize(LanguageResponseDto)
  create(@Body() language: LanguageCreationDto): Promise<LanguageResponseDto> {
    return this.languagesService.create(language);
  }

  @Get()
  @ApiQuery({ name: "participantId", required: false, type: Number })
  @ApiOperation({ summary: "Get all languages" })
  @Serialize(LanguageResponseDto)
  index(@Query("participantId") participantId?: number): Promise<LanguageResponseDto[]> {
    return this.languagesService.findAll(participantId);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a language by ID" })
  @Serialize(LanguageResponseDto)
  get(@Param("id") id: string): Promise<LanguageResponseDto> {
    return this.languagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a language by ID" })
  @Serialize(LanguageResponseDto)
  update(@Param("id") id: string, @Body() language: LanguageMutationDto): Promise<LanguageResponseDto> {
    return this.languagesService.update(+id, language);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a language by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.languagesService.remove(+id);
  }
}
