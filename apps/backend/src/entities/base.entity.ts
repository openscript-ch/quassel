import { PrimaryKey } from "@mikro-orm/core";

export abstract class BaseEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;
}
