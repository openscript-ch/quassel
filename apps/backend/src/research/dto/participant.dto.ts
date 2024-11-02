import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional } from "class-validator";
import { Questionnaire } from "../entities/questionnaire.entity";
import { Carer } from "../../defaults/entities/carer.entity";
import { Language } from "../../defaults/entities/language.entity";

export class ParticipantDto {
  @ApiProperty({ example: 1, description: "The id of the participant (child id)" })
  id: number;

  @ApiProperty({ example: "2024-11-01T00:05:02.718Z", description: "The birthday of the participant" })
  @IsDate()
  @IsOptional()
  birthday?: Date;

  @Type(() => Array<Questionnaire>)
  questionnaires: Questionnaire[];

  @Type(() => Carer)
  carers: Carer[];

  @Type(() => Language)
  languages: Language[];
}

export class ParticipantResponseDto extends ParticipantDto {}
export class ParticipantCreationDto extends ParticipantDto {}
export class ParticipantMutationDto extends PartialType(ParticipantDto) {}
