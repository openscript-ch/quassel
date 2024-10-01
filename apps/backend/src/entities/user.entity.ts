import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  email!: string;

  @Property()
  password!: string;
}
