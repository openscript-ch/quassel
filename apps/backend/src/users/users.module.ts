import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { SessionService } from "./session.service";
import { SessionController } from "./session.controller";
import { APP_GUARD } from "@nestjs/core";
import { SessionGuard } from "./guards/session.guard";
import { RolesGuard } from "./guards/roles.guard";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UsersController, SessionController],
  providers: [UsersService, SessionService, { provide: APP_GUARD, useClass: SessionGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class UsersModule {}
