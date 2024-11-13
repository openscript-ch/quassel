import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty } from "class-validator";
import { ParticipantDto } from "../participants/participant.dto";
import { StudyDto } from "../studies/study.dto";

export class QuestionnaireDto {
  @ApiProperty({ example: 1, description: "The id of the questionnaire" })
  id: number;

  @ApiProperty({ example: "2024-11-01T07:00:00.000Z", description: "The starting date of the questionnaire" })
  @IsDate()
  startedAt?: Date;

  @ApiProperty({ example: "2024-11-01T08:00:00.00Z", description: "The ending date of the questionnaire" })
  @IsDate()
  endedAt?: Date;

  @ApiProperty({ example: "First few months", description: "The title of the questionnaire" })
  @IsNotEmpty()
  title?: string;

  @ApiProperty({ example: "We went on holidays for 2 weeks and only spoke Esperanto", description: "The remark of the questionnaire" })
  remark?: string;

  @Type(() => StudyDto)
  study?: StudyDto;

  @Type(() => ParticipantDto)
  participant?: ParticipantDto;

  @Type(() => Array<number>)
  entries?: number[];
}
export class QuestionnaireResponseDto extends QuestionnaireDto {}
export class QuestionnaireCreationDto extends OmitType(QuestionnaireDto, ["id"]) {}
export class QuestionnaireMutationDto extends PartialType(QuestionnaireCreationDto) {}
