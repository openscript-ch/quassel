import { ClassSerializerContextOptions, SerializeOptions, Type } from "@nestjs/common";

export const Serialize = (dto: Type, options?: Omit<ClassSerializerContextOptions, "type">) =>
  SerializeOptions({ type: dto, excludeExtraneousValues: true, ...options });
