import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsOptional, Min, Max, IsMilitaryTime } from "class-validator";
import { CarerResponseDto } from "../../defaults/carers/carer.dto";
import { EntryLanguageCreationDto, EntryLanguageResponseDto } from "../entry-languages/entry-language.dto";

class EntryBaseDto {
  @ApiProperty({ example: "2024-11-01T07:00:00.000Z", description: "The starting date of the entry" })
  @IsMilitaryTime()
  @Expose()
  startedAt: string;

  @ApiProperty({ example: "2024-11-01T08:00:00.00Z", description: "The ending date of the entry" })
  @IsMilitaryTime()
  @Expose()
  endedAt: string;

  @ApiProperty({ example: 1, description: "The weekly recurring of the entry" })
  @Min(1)
  @IsOptional()
  @Expose()
  weeklyRecurring?: number;
}
export class EntryResponseDto extends EntryBaseDto {
  @ApiProperty({ example: 1, description: "The id of the entry" })
  @Expose()
  id: number;

  @ApiProperty({ example: 1, description: "The weekday of the entry (Sunday is 0 like in JS)" })
  @Min(0)
  @Max(6)
  @Expose()
  weekday: number;

  @Type(() => CarerResponseDto)
  @Expose()
  carer: CarerResponseDto;

  @Type(() => EntryLanguageResponseDto)
  @Expose()
  entryLanguages: Array<EntryLanguageResponseDto>;
}

class EntryMutationDto extends EntryBaseDto {
  carer: number;
  questionnaire: number;

  @Type(() => EntryLanguageCreationDto)
  entryLanguages: Array<EntryLanguageCreationDto>;
}
export class EntryCreationDto extends EntryMutationDto {
  weekday: number[];
}
export class EntryUpdateDto extends PartialType(EntryMutationDto) {}

export class EntryTemplateDto {
  @Type(() => CarerResponseDto)
  @Expose()
  carer: CarerResponseDto;

  @Type(() => EntryLanguageResponseDto)
  @Expose()
  entryLanguages: Array<EntryLanguageResponseDto>;
}
