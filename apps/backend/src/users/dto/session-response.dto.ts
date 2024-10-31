import { OmitType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class SessionResponseDto extends OmitType(UserDto, ["password"]) {}
