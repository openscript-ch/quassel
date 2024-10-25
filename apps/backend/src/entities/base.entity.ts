import { PrimaryKey } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ columnType: "serial", autoincrement: true })
  id!: number;
}
