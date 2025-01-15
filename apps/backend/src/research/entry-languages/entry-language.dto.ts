import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { Min, Max } from "class-validator";
import { LanguageResponseDto } from "../../defaults/languages/language.dto";

export class EntryLanguageBaseDto {
  @ApiProperty({ example: "50", description: "The ratio in percent of the entry language" })
  @Min(1)
  @Max(100)
  @Expose()
  ratio: number;
}
export class EntryLanguageResponseDto extends EntryLanguageBaseDto {
  @ApiProperty({ example: 1, description: "The id of the entry language" })
  @Expose()
  id: number;

  @Type(() => LanguageResponseDto)
  @Expose()
  language: LanguageResponseDto;
}

export class EntryLanguageCreationDto extends EntryLanguageBaseDto {
  language?: number;
}

export class EntryLanguageMutationDto extends EntryLanguageCreationDto {
  id?: number;
}
