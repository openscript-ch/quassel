import { BaseEntity as SuperBaseEntity, PrimaryKey } from "@mikro-orm/core";

export abstract class BaseEntity extends SuperBaseEntity {
  @PrimaryKey({ columnType: "serial", autoincrement: true })
  id!: number;
}
