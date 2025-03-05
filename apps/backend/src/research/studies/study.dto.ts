import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { ParticipantResponseDto } from "../participants/participant.dto";

class StudyBaseDto {
  @ApiProperty({ example: 1, description: "The id of the study (child id)" })
  @Expose()
  id: number;

  @ApiProperty({ example: "Series 1", description: "The title of the study" })
  @IsNotEmpty()
  @Expose()
  title: string;
}

export class StudyResponseDto extends StudyBaseDto {
  @ApiProperty({ example: 1, description: "The count of participants assigned to this study" })
  @Expose()
  participantsCount?: number;
}
export class StudyDetailResponseDto extends StudyResponseDto {
  @Type(() => ParticipantResponseDto)
  @Expose()
  participants: ParticipantResponseDto[];
}
export class StudyCreationDto extends StudyBaseDto {}
export class StudyMutationDto extends PartialType(StudyBaseDto) {}
