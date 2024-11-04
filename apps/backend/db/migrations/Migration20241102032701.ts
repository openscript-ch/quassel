import { Migration } from "@mikro-orm/migrations";

export class Migration20241102032701 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "user" alter column "role" type "UserRole" using ("role"::"UserRole");`);
    this.addSql(`alter table "user" alter column "role" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" alter column "role" type "UserRole" using ("role"::"UserRole");`);
    this.addSql(`alter table "user" alter column "role" set not null;`);
  }
}
