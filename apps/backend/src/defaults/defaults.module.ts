import { Module } from "@nestjs/common";
import { CarersController } from "./carers.controller";
import { CarersService } from "./carers.service";

@Module({
  controllers: [CarersController],
  providers: [CarersService],
})
export class DefaultsModule {}
