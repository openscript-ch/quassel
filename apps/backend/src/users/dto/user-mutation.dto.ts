import { PartialType } from "@nestjs/swagger";
import { UserCreationDto } from "./user-creation.dto";

export class UserMutationDto extends PartialType(UserCreationDto) {}
