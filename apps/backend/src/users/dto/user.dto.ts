import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "../entities/user.entity";

export class UserDto {
  @ApiProperty({ example: 1, description: "The id of the user" })
  id: number;

  @ApiProperty({ example: "administrator@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "quassel*1234", description: "The password of the user" })
  @IsString()
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: UserRole.ADMIN, description: "The role of the user" })
  role?: UserRole;
}
