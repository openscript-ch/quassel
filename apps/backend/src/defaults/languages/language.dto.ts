import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { ParticipantResponseDto } from "../../research/participants/participant.dto";

class LanguageBaseDto {
  @ApiProperty({ example: "Deutsch", description: "The name of the language" })
  @MinLength(1)
  @IsNotEmpty()
  @Expose()
  name: string;

  @ApiProperty({ example: "de-DE", description: "The IETF BCP 47 code of the language" })
  @MinLength(2)
  @IsOptional()
  @Expose()
  ietfBcp47?: string;
}

export class LanguageResponseDto extends LanguageBaseDto {
  @ApiProperty({ example: 1, description: "The id of the language" })
  @Expose()
  id: number;

  @Type(() => ParticipantResponseDto)
  @Expose()
  participant?: ParticipantResponseDto;
}

export class LanguageCreationDto extends LanguageBaseDto {
  participant?: number;
}
export class LanguageMutationDto extends PartialType(LanguageCreationDto) {}
