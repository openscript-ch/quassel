import { PartialType } from "@nestjs/swagger";
import { UserCreationDto } from "./user-creation.dto";
import { IsOptional } from "class-validator";

export class UserMutationDto extends PartialType(UserCreationDto) {
  @IsOptional()
  password?: string;
}
