import { PartialType } from "@nestjs/swagger";
import { CarerCreationDto } from "./carer-creation.dto";

export class CarerMutationDto extends PartialType(CarerCreationDto) {}
