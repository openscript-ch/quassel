import { Migration } from "@mikro-orm/migrations";

export class Migration20241209144817 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "entry" drop constraint entry_weekly_recurring_check;`);

    this.addSql(`alter table "entry" add constraint entry_weekly_recurring_check check(weekly_recurring >= 1);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "entry" drop constraint entry_weekly_recurring_check;`);

    this.addSql(`alter table "entry" add constraint entry_weekly_recurring_check check(weekday >= 1);`);
  }
}
