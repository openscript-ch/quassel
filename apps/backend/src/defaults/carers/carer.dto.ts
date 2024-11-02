import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { ParticipantDto } from "../../research/participants/participant.dto";
import { EntryDto } from "../../research/entries/entry.dto";

export class CarerDto {
  @ApiProperty({ example: 1, description: "The id of the carer" })
  id: number;

  @ApiProperty({ example: "Grandmother", description: "The name of the carer" })
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @Type(() => ParticipantDto)
  participant?: ParticipantDto;

  @Type(() => Array<EntryDto>)
  entries: EntryDto[];
}
export class CarerResponseDto extends CarerDto {}
export class CarerCreationDto extends OmitType(CarerDto, ["id"]) {}
export class CarerMutationDto extends PartialType(CarerCreationDto) {}
