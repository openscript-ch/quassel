import { Entity, Enum, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";

export enum UserRole {
  ASSISTANT = "ASSISTANT",
  ADMIN = "ADMIN",
}

@Entity()
export class User extends BaseEntity {
  @Property({ unique: true })
  email!: string;

  @Property({ hidden: true, lazy: true })
  password!: string;

  @Enum({ items: () => UserRole, nativeEnumName: "UserRole", default: UserRole.ASSISTANT })
  role?: UserRole;
}
