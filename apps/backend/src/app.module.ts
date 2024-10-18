import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserModule } from "./user/user.module";
import { ConfigModule } from "./config/config.module";

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
