import { OmitType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserResponseDto extends OmitType(UserDto, ["password"]) {}
