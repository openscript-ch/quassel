import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [MikroOrmModule.forFeature([User]), ConfigModule],
  controllers: [UsersController, SessionController],
  providers: [UsersService, SessionService],
})
export class UsersModule {}
