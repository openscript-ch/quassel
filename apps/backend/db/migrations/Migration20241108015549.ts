import { Migration } from "@mikro-orm/migrations";

export class Migration20241108015549 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_study_id_foreign";`);
    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" alter column "started_at" type timestamptz using ("started_at"::timestamptz);`);
    this.addSql(`alter table "questionnaire" alter column "started_at" drop not null;`);
    this.addSql(`alter table "questionnaire" alter column "ended_at" type timestamptz using ("ended_at"::timestamptz);`);
    this.addSql(`alter table "questionnaire" alter column "ended_at" drop not null;`);
    this.addSql(`alter table "questionnaire" alter column "title" type varchar(255) using ("title"::varchar(255));`);
    this.addSql(`alter table "questionnaire" alter column "title" drop not null;`);
    this.addSql(`alter table "questionnaire" alter column "study_id" type int using ("study_id"::int);`);
    this.addSql(`alter table "questionnaire" alter column "study_id" drop not null;`);
    this.addSql(`alter table "questionnaire" alter column "participant_id" type bigint using ("participant_id"::bigint);`);
    this.addSql(`alter table "questionnaire" alter column "participant_id" drop not null;`);
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade on delete set null;`
    );
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_study_id_foreign";`);
    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" alter column "started_at" type timestamptz using ("started_at"::timestamptz);`);
    this.addSql(`alter table "questionnaire" alter column "started_at" set not null;`);
    this.addSql(`alter table "questionnaire" alter column "ended_at" type timestamptz using ("ended_at"::timestamptz);`);
    this.addSql(`alter table "questionnaire" alter column "ended_at" set not null;`);
    this.addSql(`alter table "questionnaire" alter column "title" type varchar(255) using ("title"::varchar(255));`);
    this.addSql(`alter table "questionnaire" alter column "title" set not null;`);
    this.addSql(`alter table "questionnaire" alter column "study_id" type int using ("study_id"::int);`);
    this.addSql(`alter table "questionnaire" alter column "study_id" set not null;`);
    this.addSql(`alter table "questionnaire" alter column "participant_id" type bigint using ("participant_id"::bigint);`);
    this.addSql(`alter table "questionnaire" alter column "participant_id" set not null;`);
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade;`
    );
  }
}
