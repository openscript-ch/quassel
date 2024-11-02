import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { LanguagesService } from "./languages.service";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { LanguageCreationDto, LanguageResponseDto, LanguageMutationDto } from "./language.dto";

@ApiTags("Languages")
@Controller("languages")
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  @ApiOperation({ summary: "Create a language" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  create(@Body() language: LanguageCreationDto): Promise<LanguageResponseDto> {
    return this.languagesService.create(language);
  }

  @Get()
  @ApiOperation({ summary: "Get all languages" })
  index(): Promise<LanguageResponseDto[]> {
    return this.languagesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a language by ID" })
  get(@Param("id") id: string): Promise<LanguageResponseDto> {
    return this.languagesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a language by ID" })
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
