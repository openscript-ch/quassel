import { Migration } from "@mikro-orm/migrations";

export class Migration20241211083949 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "entry" drop constraint "entry_questionnaire_id_foreign";`);

    this.addSql(`alter table "entry" alter column "questionnaire_id" type int using ("questionnaire_id"::int);`);
    this.addSql(`alter table "entry" alter column "questionnaire_id" drop not null;`);
    this.addSql(
      `alter table "entry" add constraint "entry_questionnaire_id_foreign" foreign key ("questionnaire_id") references "questionnaire" ("id") on update cascade on delete cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "entry" drop constraint "entry_questionnaire_id_foreign";`);

    this.addSql(`alter table "entry" alter column "questionnaire_id" type int using ("questionnaire_id"::int);`);
    this.addSql(`alter table "entry" alter column "questionnaire_id" set not null;`);
    this.addSql(
      `alter table "entry" add constraint "entry_questionnaire_id_foreign" foreign key ("questionnaire_id") references "questionnaire" ("id") on update cascade;`
    );
  }
}
