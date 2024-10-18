import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import { Configuration } from "./configuration";

type Paths<T> = T extends object ? { [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}` }[keyof T] : never;
type LeaveTypes<T, S extends string> = S extends `${infer T1}.${infer T2}`
  ? T1 extends keyof T
    ? LeaveTypes<T[T1], T2>
    : never
  : S extends keyof T
    ? T[S]
    : never;

@Injectable()
export class ConfigService {
  constructor(private configService: NestConfigService) {}

  get<T extends Paths<Configuration>>(propertyPath: T): LeaveTypes<Configuration, T> {
    return this.configService.get(propertyPath);
  }
}
