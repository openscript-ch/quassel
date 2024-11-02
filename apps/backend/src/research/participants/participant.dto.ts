import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { CarerDto } from "../../defaults/carers/carer.dto";
import { LanguageDto } from "../../defaults/languages/language.dto";
import { QuestionnaireDto } from "../questionnaires/questionnaire.dto";

export class ParticipantDto {
  @ApiProperty({ example: 1, description: "The id of the participant (child id)" })
  id: number;

  @ApiProperty({ example: "2024-11-01T00:05:02.718Z", description: "The birthday of the participant" })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @Type(() => Array<QuestionnaireDto>)
  questionnaires: QuestionnaireDto[];

  @Type(() => Array<CarerDto>)
  carers: CarerDto[];

  @Type(() => Array<LanguageDto>)
  languages: LanguageDto[];
}

export class ParticipantResponseDto extends ParticipantDto {}
export class ParticipantCreationDto extends ParticipantDto {}
export class ParticipantMutationDto extends PartialType(ParticipantDto) {}
