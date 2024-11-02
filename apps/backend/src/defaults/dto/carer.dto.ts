import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";
import { Type } from "class-transformer";
import { Entry } from "../../research/entities/entry.entity";
import { ParticipantDto } from "../../research/dto/participant.dto";

export class CarerDto {
  @ApiProperty({ example: 1, description: "The id of the carer" })
  id: number;

  @ApiProperty({ example: "Grandmother", description: "The name of the carer" })
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @Type(() => ParticipantDto)
  participant?: ParticipantDto;

  @Type(() => Entry)
  entries: Entry[];
}
export class CarerResponseDto extends CarerDto {}
export class CarerCreationDto extends OmitType(CarerDto, ["id"]) {}
export class CarerMutationDto extends PartialType(CarerCreationDto) {}
