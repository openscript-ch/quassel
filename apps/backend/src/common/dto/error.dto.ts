import { ApiProperty } from "@nestjs/swagger";

export class ErrorResponseDto {
  @ApiProperty({ description: "Status code of the error" })
  statusCode: number;

  @ApiProperty({ description: "Descriptive message of the error" })
  message: string;

  @ApiProperty({ description: "Error name" })
  error?: string;
}
