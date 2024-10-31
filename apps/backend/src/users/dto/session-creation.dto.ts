import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SessionCreationDto {
  @ApiProperty({ example: "administrator@example.ch", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "quassel*1234", description: "The password of the user" })
  @IsString()
  @IsNotEmpty()
  password: string;
}
