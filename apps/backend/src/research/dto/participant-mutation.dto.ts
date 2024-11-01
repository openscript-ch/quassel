import { PartialType } from "@nestjs/swagger";
import { ParticipantDto } from "./participant.dto";

export class ParticipantMutationDto extends PartialType(ParticipantDto) {}
