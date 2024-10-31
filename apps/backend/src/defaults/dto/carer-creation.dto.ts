import { OmitType } from "@nestjs/swagger";
import { CarerDto } from "./carer.dto";

export class CarerCreationDto extends OmitType(CarerDto, ["id"]) {}
