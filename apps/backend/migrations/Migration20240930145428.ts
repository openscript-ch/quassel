import { Migration } from "@mikro-orm/migrations";

export class Migration20240930145428 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);
  }
}
