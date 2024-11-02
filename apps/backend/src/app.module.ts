import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ConfigModule } from "./config/config.module";
import { SystemModule } from "./system/system.module";
import { DefaultsModule } from "./defaults/defaults.module";
import { ResearchModule } from "./research/research.module";

@Module({
  imports: [MikroOrmModule.forRoot(), ConfigModule, SystemModule, DefaultsModule, ResearchModule],
})
export class AppModule {}
