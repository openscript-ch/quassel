import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiUnprocessableEntityResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../../common/dto/error.dto";
import { Roles } from "../../system/users/roles.decorator";
import { UserRole } from "../../system/users/user.entity";
import { QuestionnairesService } from "./questionnaires.service";
import { QuestionnaireCreationDto, QuestionnaireResponseDto, QuestionnaireMutationDto, QuestionnairesResponseDto } from "./questionnaire.dto";

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
  @ApiOperation({ summary: "Get all questionnairess" })
  index(): Promise<QuestionnairesResponseDto> {
    return this.questionnairesService.findAll();
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
