import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CarerDto {
  @ApiProperty({ example: 1, description: "The id of the carer" })
  id: number;

  @ApiProperty({ example: "Grandmother", description: "The name of the carer" })
  @MinLength(1)
  @IsNotEmpty()
  name: string;
}
