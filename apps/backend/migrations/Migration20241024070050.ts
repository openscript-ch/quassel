import { Migration } from "@mikro-orm/migrations";

export class Migration20241024070050 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "participant" add column "birthday" timestamptz null;`);

    this.addSql(`alter table "language" drop column "iso693";`);

    this.addSql(`alter table "language" add column "ietf_bcp47" varchar(50) null;`);

    this.addSql(`alter table "questionnaire" alter column "remark" type text using ("remark"::text);`);
    this.addSql(`alter table "questionnaire" rename column "description" to "title";`);

    this.addSql(`alter table "entry" alter column "weekday" type smallint using ("weekday"::smallint);`);
    this.addSql(`alter table "entry" alter column "weekly_recurring" type smallint using ("weekly_recurring"::smallint);`);
    this.addSql(`alter table "entry" add constraint entry_weekly_recurring_check check(weekday >= 1);`);

    this.addSql(`alter table "entry_language" alter column "ratio" type smallint using ("ratio"::smallint);`);
    this.addSql(`alter table "entry_language" add constraint entry_language_ratio_check check(ratio > 0 AND ratio <= 100);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "participant" drop column "birthday";`);

    this.addSql(`alter table "language" drop column "ietf_bcp47";`);

    this.addSql(`alter table "language" add column "iso693" varchar(255) null;`);

    this.addSql(`alter table "questionnaire" alter column "remark" type varchar(255) using ("remark"::varchar(255));`);
    this.addSql(`alter table "questionnaire" rename column "title" to "description";`);

    this.addSql(`alter table "entry" drop constraint entry_weekly_recurring_check;`);

    this.addSql(`alter table "entry" alter column "weekday" type int using ("weekday"::int);`);
    this.addSql(`alter table "entry" alter column "weekly_recurring" type int using ("weekly_recurring"::int);`);

    this.addSql(`alter table "entry_language" drop constraint entry_language_ratio_check;`);

    this.addSql(`alter table "entry_language" alter column "ratio" type varchar(255) using ("ratio"::varchar(255));`);
  }
}
