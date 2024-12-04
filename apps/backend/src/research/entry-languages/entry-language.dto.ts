import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { Min, Max } from "class-validator";
import { LanguageDto } from "../../defaults/languages/language.dto";
import { QuestionnaireEntryDto } from "../entries/entry.dto";

export class EntryLanguageDto {
  @ApiProperty({ example: 1, description: "The id of the entry language" })
  id: number;

  @ApiProperty({ example: "50", description: "The ratio in percent of the entry language" })
  @Min(1)
  @Max(100)
  ratio: number;

  @Type(() => LanguageDto)
  language: LanguageDto;

  @Type(() => QuestionnaireEntryDto)
  entry: QuestionnaireEntryDto;
}
export class EntryLanguageResponseDto extends OmitType(EntryLanguageDto, ["entry"]) {}
export class EntryLanguageCreationDto extends OmitType(EntryLanguageDto, ["id", "entry", "language"]) {
export class EntryLanguageMutationDto extends PartialType(EntryLanguageCreationDto) {}
