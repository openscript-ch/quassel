import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";
import { QuestionnaireResponseDto } from "../questionnaires/questionnaire.dto";

class ParticipantBaseDto {
  @ApiProperty({ example: 1, description: "The id of the participant (child id)" })
  @Expose()
  id: number;

  @ApiProperty({ example: "2024-11-01T00:05:02.718Z", description: "The birthday of the participant" })
  @IsDateString()
  @IsOptional()
  @Expose()
  birthday?: Date;
}

export class ParticipantResponseDto extends ParticipantBaseDto {
  @Type(() => QuestionnaireResponseDto)
  @Expose()
  latestQuestionnaire?: QuestionnaireResponseDto;
}

export class ParticipantCreationDto extends ParticipantBaseDto {}
export class ParticipantMutationDto extends PartialType(ParticipantBaseDto) {}

export enum ParticipantSortableField {
  id = "id",
  birthday = "birthday",
}
