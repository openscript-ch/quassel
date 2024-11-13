import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, MikroOrmHealthIndicator } from "@nestjs/terminus";
import { Public } from "../session/public.decorator";

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private database: MikroOrmHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  @Public()
  get() {
    return this.health.check([() => this.database.pingCheck("database")]);
  }
}
