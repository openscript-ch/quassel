import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { UserDto } from "../users/user.dto";

export class SessionDto {
  @ApiProperty({ example: "admin@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "Quassel*1234", description: "The password of the user" })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SessionCreationDto extends SessionDto {}
export class SessionResponseDto extends OmitType(UserDto, ["password"]) {}
