import { Module } from "@nestjs/common";
import { CarersController } from "./controllers/carers.controller";
import { CarersService } from "./services/carers.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Carer } from "./entities/carer.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Carer])],
  controllers: [CarersController],
  providers: [CarersService],
})
export class DefaultsModule {}
