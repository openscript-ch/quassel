import { Module } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "./users/user.entity";
import { SessionService } from "./session/session.service";
import { SessionController } from "./session/session.controller";
import { APP_GUARD } from "@nestjs/core";
import { SessionGuard } from "./session/session.guard";
import { RolesGuard } from "./users/roles.guard";
import { HealthController } from "./health/health.controller";
import { TerminusModule } from "@nestjs/terminus";
import { StatusController } from "./status/status.controller";
import { ExportController } from "./export/export.controller";
import { ExportService } from "./export/export.service";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [MikroOrmModule.forFeature([User]), TerminusModule, ConfigModule],
  controllers: [UsersController, SessionController, HealthController, StatusController, ExportController],
  providers: [
    UsersService,
    SessionService,
    ExportService,
    { provide: APP_GUARD, useClass: SessionGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class SystemModule {}
