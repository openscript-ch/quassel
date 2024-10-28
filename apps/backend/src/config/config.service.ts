import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { Configuration } from "./configuration";

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T extends Leaves<Configuration>>(propertyPath: T): LeaveTypes<Configuration, T> {
    return this.configService.get(propertyPath);
  }
}
