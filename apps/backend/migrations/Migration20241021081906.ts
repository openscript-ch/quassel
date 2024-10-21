import { Migration } from "@mikro-orm/migrations";

export class Migration20241021081906 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "entry" add constraint entry_weekday_check check(weekday >= 0 AND weekday < 7);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "entry" drop constraint entry_weekday_check;`);
  }
}
