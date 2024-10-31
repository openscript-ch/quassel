import { Module } from "@nestjs/common";
import { CarerController } from "./carer.controller";
import { CarerService } from "./carer.service";

@Module({
  controllers: [CarerController],
  providers: [CarerService],
})
export class DefaultsModule {}
