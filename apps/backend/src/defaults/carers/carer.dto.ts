import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { ParticipantDto } from "../../research/participants/participant.dto";

export class CarerDto {
  @ApiProperty({ example: 1, description: "The id of the carer" })
  id: number;

  @ApiProperty({ example: "Grandmother", description: "The name of the carer" })
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @Matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
  @ApiProperty({ example: "#ffffff", description: "The color used to display entries in the calendar" })
  color?: string;

  @Type(() => ParticipantDto)
  participant?: ParticipantDto;

  @Type(() => Array<number>)
  entries: number[];
}
export class CarerResponseDto extends CarerDto {}
export class CarerCreationDto extends OmitType(CarerDto, ["id", "entries", "participant"]) {
  participant?: number;
}
export class CarerMutationDto extends PartialType(CarerCreationDto) {}
