import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDateString, IsOptional } from "class-validator";

export class ParticipantDto {
  @ApiProperty({ example: 1, description: "The id of the participant (child id)" })
  id: number;

  @ApiProperty({ example: "2024-11-01T00:05:02.718Z", description: "The birthday of the participant" })
  @IsDateString()
  @IsOptional()
  birthday?: Date;

  @Type(() => Array<number>)
  questionnaires: number[];

  @Type(() => Array<number>)
  carers: number[];

  @Type(() => Array<number>)
  languages: number[];
}

export class ParticipantResponseDto extends ParticipantDto {}
export class ParticipantCreationDto extends OmitType(ParticipantDto, ["questionnaires", "carers", "languages"]) {}
export class ParticipantMutationDto extends PartialType(ParticipantDto) {}
