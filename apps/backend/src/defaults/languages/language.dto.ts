import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { MinLength, IsNotEmpty, IsOptional } from "class-validator";
import { ParticipantDto } from "../../research/participants/participant.dto";
import { EntryLanguageDto } from "../../research/entry-languages/entry-language.dto";

export class LanguageDto {
  @ApiProperty({ example: 1, description: "The id of the language" })
  id: number;

  @ApiProperty({ example: "Deutsch", description: "The name of the language" })
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "de-DE", description: "The IETF BCP 47 code of the language" })
  @MinLength(2)
  @IsOptional()
  ietfBcp47?: string;

  @Type(() => ParticipantDto)
  participant?: ParticipantDto;

  @Type(() => Array<EntryLanguageDto>)
  entryLanguages: EntryLanguageDto[];
}
export class LanguageResponseDto extends LanguageDto {}
export class LanguageCreationDto extends OmitType(LanguageDto, ["id"]) {}
export class LanguageMutationDto extends PartialType(LanguageCreationDto) {}
