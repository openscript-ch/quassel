import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";

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
  @ApiProperty({ example: 1, description: "The count of questionnaires tracked to this study" })
  @Expose()
  questionnairesCount?: number;
}
export class StudyCreationDto extends StudyBaseDto {}
export class StudyMutationDto extends PartialType(StudyBaseDto) {}
