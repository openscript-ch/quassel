import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { SessionService } from "./session.service";
import { LocalStrategy } from "./local.strategy";
import { SessionController } from "./session.controller";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { ConfigService } from "../config/config.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    MikroOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({ secret: configService.get("auth.jwtSecret"), signOptions: { expiresIn: "1d" } }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [UsersController, SessionController],
  providers: [UsersService, SessionService, LocalStrategy, JwtStrategy],
})
export class UsersModule {}
