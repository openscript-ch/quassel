import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional } from "class-validator";

export class ParticipantDto {
  @ApiProperty({ example: 1, description: "The id of the participant (child id)" })
  id: number;

  @ApiProperty({ example: "2024-11-01T00:05:02.718Z", description: "The birthday of the participant" })
  @IsDate()
  @IsOptional()
  birthday: Date;
}
