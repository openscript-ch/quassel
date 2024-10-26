import { ApiProperty } from "@nestjs/swagger";
import { Equals, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "bart.simpson@example.ch", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "bart*macht*keine*Hausaufgaben", description: "The password of the user" })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: "bart*macht*keine*Hausaufgaben", description: "The password confirmation of the user" })
  @Equals("password")
  passwordConfirmation: string;
}
