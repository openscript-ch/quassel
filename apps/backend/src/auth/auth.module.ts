import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/entities/user.entity";
import { SessionController } from "./session.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "src/config/config.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { ConfigModule } from "src/config/config.module";

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("auth.jwtSecret"),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [SessionController],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
