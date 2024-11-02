import { Module } from "@nestjs/common";
import { CarersController } from "./carers/carers.controller";
import { CarersService } from "./carers/carers.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Carer } from "./carers/carer.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Carer])],
  controllers: [CarersController],
  providers: [CarersService],
})
export class DefaultsModule {}
