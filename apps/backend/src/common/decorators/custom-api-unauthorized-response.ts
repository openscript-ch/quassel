import { ApiUnauthorizedResponse } from "@nestjs/swagger";
import { ErrorResponseDto } from "../dto/error.dto";

export const CustomApiUnauthorizedResponse = () => ApiUnauthorizedResponse({ type: ErrorResponseDto, description: "Unauthorized" });
