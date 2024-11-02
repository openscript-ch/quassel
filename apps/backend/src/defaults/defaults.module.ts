import { Module } from "@nestjs/common";
import { CarersController } from "./carers/carers.controller";
import { CarersService } from "./carers/carers.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Carer } from "./carers/carer.entity";
import { LanguagesController } from "./languages/languages.controller";
import { LanguagesService } from "./languages/languages.service";
import { Language } from "./languages/language.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Carer, Language])],
  controllers: [CarersController, LanguagesController],
  providers: [CarersService, LanguagesService],
})
export class DefaultsModule {}
