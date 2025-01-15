import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserRole } from "../users/user.entity";
import { Expose } from "class-transformer";

class UserBaseDto {
  @ApiProperty({ example: "admin@example.com", description: "The email of the user" })
  @IsEmail()
  @IsNotEmpty()
  @Expose()
  email: string;

  @Expose()
  @ApiProperty({ example: UserRole.ADMIN, description: "The role of the user" })
  role?: UserRole;
}

export class UserResponseDto extends UserBaseDto {
  @Expose()
  @ApiProperty({ example: 1, description: "The id of the user" })
  id: number;
}

export class UserCreationDto extends UserBaseDto {
  @ApiProperty({ example: "Quassel*1234", description: "The password of the user" })
  @IsString()
  @IsStrongPassword({ minLength: 8 })
  @IsNotEmpty()
  password: string;
}

export class UserMutationDto extends PartialType(UserCreationDto) {
  @IsOptional()
  password?: string;
}
