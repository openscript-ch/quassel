import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { SentryGlobalFilter, SentryModule } from "@sentry/nestjs/setup";
import { ConfigModule } from "./config/config.module";
import { SystemModule } from "./system/system.module";
import { DefaultsModule } from "./defaults/defaults.module";
import { ResearchModule } from "./research/research.module";

@Module({
  imports: [SentryModule.forRoot(), MikroOrmModule.forRoot(), ConfigModule, SystemModule, DefaultsModule, ResearchModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
  ],
})
export class AppModule {}
