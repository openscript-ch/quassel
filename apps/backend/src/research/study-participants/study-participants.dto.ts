import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

class StudyParticipantBaseDto {
  @ApiProperty({ example: 1, description: "The id of the participant" })
  @Expose()
  participantId: number;

  @ApiProperty({ example: 1, description: "The id of the study" })
  @Expose()
  studyId: number;
}

export class StudyParticipantResponseDto extends StudyParticipantBaseDto {}
export class StudyParticipantMutationDto extends StudyParticipantBaseDto {}
