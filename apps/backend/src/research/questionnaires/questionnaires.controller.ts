import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiUnprocessableEntityResponse, ApiQuery } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { QuestionnairesService } from "./questionnaires.service";
import {
  QuestionnaireCreationDto,
  QuestionnaireResponseDto,
  QuestionnaireMutationDto,
  QuestionnaireListResponseDto,
  QuestionnaireSortableField,
} from "./questionnaire.dto";
import { SortOrder } from "../../common/dto/sort.dto";

@ApiTags("Questionnaires")
@Controller("questionnaires")
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Post()
  @ApiOperation({ summary: "Create a questionnaires" })
  @ApiUnprocessableEntityResponse({ description: "Unique name constraint violation", type: ErrorResponseDto })
  create(@Body() questionnaires: QuestionnaireCreationDto): Promise<QuestionnaireResponseDto> {
    return this.questionnairesService.create(questionnaires);
  }

  @Get()
  @ApiQuery({ name: "sortBy", enum: QuestionnaireSortableField, required: false })
  @ApiQuery({ name: "sortOrder", enum: SortOrder, required: false })
  @ApiQuery({ name: "participantId", required: false })
  @ApiQuery({ name: "studyTitle", required: false })
  @ApiOperation({ summary: "Get all questionnairess" })
  index(
    @Query("sortBy") sortBy?: QuestionnaireSortableField,
    @Query("sortOrder") sortOrder?: SortOrder,
    @Query("participantId") participantId?: number,
    @Query("studyTitle") studyTitle?: string
  ): Promise<QuestionnaireListResponseDto[]> {
    return this.questionnairesService.findAll({ sortBy, sortOrder, participantId, studyTitle });
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a questionnaires by ID" })
  get(@Param("id") id: string): Promise<QuestionnaireResponseDto> {
    return this.questionnairesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a questionnaires by ID" })
  update(@Param("id") id: string, @Body() questionnaires: QuestionnaireMutationDto): Promise<QuestionnaireResponseDto> {
    return this.questionnairesService.update(+id, questionnaires);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a questionnaires by ID" })
  @Roles(UserRole.ADMIN)
  delete(@Param("id") id: string) {
    return this.questionnairesService.remove(+id);
  }
}
