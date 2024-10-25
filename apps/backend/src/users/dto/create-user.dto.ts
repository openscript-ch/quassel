import { Equals, IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @Equals("password")
  passwordConfirmation: string;
}
