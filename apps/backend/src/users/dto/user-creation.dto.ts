import { OmitType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class UserCreationDto extends OmitType(UserDto, ["id"]) {}
