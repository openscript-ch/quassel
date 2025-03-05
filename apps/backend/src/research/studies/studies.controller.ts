import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { StudiesService } from "./studies.service";
import { StudyCreationDto, StudyResponseDto, StudyMutationDto, StudyDetailResponseDto } from "./study.dto";
import { Serialize } from "../../common/decorators/serialize";

@ApiTags("Studies")
@Controller("studies")
export class StudiesController {
  constructor(private readonly studiesService: StudiesService) {}

  @Post()
  @ApiOperation({ summary: "Create a study" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  @Serialize(StudyResponseDto)
  create(@Body() study: StudyCreationDto): Promise<StudyResponseDto> {
    return this.studiesService.create(study);
  }

  @Get()
  @ApiOperation({ summary: "Get all studies" })
  @Serialize(StudyResponseDto)
  index(): Promise<StudyResponseDto[]> {
    return this.studiesService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a study by ID" })
  @ApiNotFoundResponse({ description: "Entity not found exception", type: ErrorResponseDto })
  @Serialize(StudyDetailResponseDto)
  get(@Param("id") id: string): Promise<StudyDetailResponseDto> {
    return this.studiesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a study by ID" })
  @Serialize(StudyResponseDto)
  update(@Param("id") id: string, @Body() study: StudyMutationDto): Promise<StudyResponseDto> {
    return this.studiesService.update(+id, study);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a study by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.studiesService.remove(+id);
  }
}
