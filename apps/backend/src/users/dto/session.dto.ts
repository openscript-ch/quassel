import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "./user.dto";

export class SessionCreationDto {
  @ApiProperty({ example: "administrator@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "quassel*1234", description: "The password of the user" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SessionResponseDto extends OmitType(UserDto, ["password"]) {}
