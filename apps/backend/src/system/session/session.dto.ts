import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";
import { UserResponseDto } from "../users/user.dto";

class SessionBaseDto {
  @ApiProperty({ example: "admin@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;
}

export class SessionCreationDto extends SessionBaseDto {
  @ApiProperty({ example: "Quassel*1234", description: "The password of the user" })
  @IsString()
  @IsNotEmpty()
  @Expose()
  password: string;
}

export class SessionResponseDto extends UserResponseDto {
  @ApiProperty({ example: "1737029456", description: "Expiration time of authentication" })
  @IsNumber()
  @Expose()
  expiresAt: number;
}
