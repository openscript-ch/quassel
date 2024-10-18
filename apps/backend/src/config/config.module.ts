import { Module } from "@nestjs/common";
import { configuration } from "./configuration";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
})
export class ConfigModule {}
