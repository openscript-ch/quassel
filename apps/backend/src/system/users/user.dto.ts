import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "../users/user.entity";

export class UserDto {
  @ApiProperty({ example: 1, description: "The id of the user" })
  id: number;

  @ApiProperty({ example: "admin@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "Quassel*1234", description: "The password of the user" })
  @IsString()
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: UserRole.ADMIN, description: "The role of the user" })
  role?: UserRole;
}
export class UserResponseDto extends OmitType(UserDto, ["password"]) {}
export class UserCreationDto extends OmitType(UserDto, ["id"]) {}
export class UserMutationDto extends PartialType(UserCreationDto) {
  @IsOptional()
  password?: string;
}
