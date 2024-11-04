import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { Configuration } from "./configuration";

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T extends Leaves<Configuration>>(propertyPath: T): LeaveTypes<Configuration, T> {
    const value = this.configService.get(propertyPath);
    if (value === undefined) {
      throw new Error(`Configuration property "${propertyPath}" is not defined`);
    }
    return value;
  }
}
