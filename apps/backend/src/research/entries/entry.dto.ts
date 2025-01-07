import { ApiProperty, OmitType, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, Min, Max, IsMilitaryTime } from "class-validator";
import { CarerDto } from "../../defaults/carers/carer.dto";
import { EntryQuestionnaireDto, QuestionnaireDto } from "../questionnaires/questionnaire.dto";
import { EntryLanguageCreationDto, EntryLanguageResponseDto } from "../entry-languages/entry-language.dto";

export class EntryDto {
  @ApiProperty({ example: 1, description: "The id of the entry" })
  id: number;

  @ApiProperty({ example: "2024-11-01T07:00:00.000Z", description: "The starting date of the entry" })
  @IsMilitaryTime()
  startedAt: string;

  @ApiProperty({ example: "2024-11-01T08:00:00.00Z", description: "The ending date of the entry" })
  @IsMilitaryTime()
  endedAt: string;

  @ApiProperty({ example: 1, description: "The weekday of the entry (Sunday is 0 like in JS)" })
  @Min(0)
  @Max(6)
  weekday: number;

  @ApiProperty({ example: 1, description: "The weekly recurring of the entry" })
  @Min(1)
  @IsOptional()
  weeklyRecurring?: number;

  @Type(() => QuestionnaireDto)
  questionnaire: EntryQuestionnaireDto;

  @Type(() => CarerDto)
  carer: CarerDto;

  @Type(() => Array<EntryLanguageResponseDto>)
  entryLanguages: Array<EntryLanguageResponseDto>;
}
export class EntryResponseDto extends EntryDto {}
export class QuestionnaireEntryDto extends OmitType(EntryDto, ["questionnaire"]) {}
export class EntryCreationDto extends OmitType(EntryDto, ["id", "carer", "questionnaire", "entryLanguages"]) {
  carer: number;
  questionnaire: number;

  @Type(() => EntryLanguageCreationDto)
  entryLanguages: Array<EntryLanguageCreationDto>;
}
export class EntryMutationDto extends PartialType(EntryCreationDto) {}

export class EntryTemplateDto extends PickType(EntryDto, ["carer", "entryLanguages"]) {}
