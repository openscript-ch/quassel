import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { QuestionnaireDto } from "../questionnaires/questionnaire.dto";

export class StudyDto {
  @ApiProperty({ example: 1, description: "The id of the study (child id)" })
  id: number;

  @ApiProperty({ example: "Series 1", description: "The title of the study" })
  @IsNotEmpty()
  title: string;

  @Type(() => Array<QuestionnaireDto>)
  questionnaires: QuestionnaireDto[];
}

export class StudyResponseDto extends StudyDto {}
export class StudyCreationDto extends StudyDto {}
export class StudyMutationDto extends PartialType(StudyDto) {}
