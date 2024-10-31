import { PartialType } from "@nestjs/swagger";
import { UserCreationDto } from "./user-creation.dto";
import { ValidateIf } from "class-validator";

export class UserMutationDto extends PartialType(UserCreationDto) {
  @ValidateIf((o) => o.password !== undefined)
  password?: string;
}
