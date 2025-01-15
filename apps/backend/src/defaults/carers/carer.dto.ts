import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Matches, MinLength } from "class-validator";
import { Expose, Type } from "class-transformer";
import { ParticipantResponseDto } from "../../research/participants/participant.dto";

export class CarerBaseDto {
  @ApiProperty({ example: "Grandmother", description: "The name of the carer" })
  @MinLength(1)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Matches("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$")
  @ApiProperty({ example: "#ffffff", description: "The color used to display entries in the calendar" })
  @IsOptional()
  @Expose()
  color?: string;
}

export class CarerResponseDto extends CarerBaseDto {
  @ApiProperty({ example: 1, description: "The id of the carer" })
  @Expose()
  id: number;

  @Type(() => ParticipantResponseDto)
  @Expose()
  participant?: ParticipantResponseDto;
}

export class CarerCreationDto extends CarerBaseDto {
  participant?: number;
}
export class CarerMutationDto extends PartialType(CarerCreationDto) {}
