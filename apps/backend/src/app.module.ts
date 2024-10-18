import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config/config.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/jwt.guard";
import { JwtStrategy } from "./auth/jwt.strategy";

@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, AuthModule, ConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
