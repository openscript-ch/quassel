import { Entity, Enum, Opt, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

enum UserRole {
  ASSISTANT = "ASSISTANT",
  ADMIN = "ADMIN",
}

@Entity()
export class User extends BaseEntity {
  @Property()
  email!: string;

  @Property()
  password!: string;

  @Enum({ items: () => UserRole, nativeEnumName: "UserRole", default: UserRole.ASSISTANT })
  role!: UserRole & Opt;
}
