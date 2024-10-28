import { Module } from "@nestjs/common";
import { configuration } from "./configuration";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigService } from "./config.service";

@Module({
  imports: [NestConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
