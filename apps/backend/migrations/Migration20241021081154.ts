import { Migration } from "@mikro-orm/migrations";

export class Migration20241021081154 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create type "UserRole" as enum ('ASSISTANT', 'ADMIN');`);
    this.addSql(`create table "participant" ("id" serial primary key);`);

    this.addSql(
      `create table "language" ("id" serial primary key, "name" varchar(255) not null, "iso693" varchar(255) null, "participant_id" int null);`
    );

    this.addSql(`create table "carer" ("id" serial primary key, "name" varchar(255) not null, "participant_id" int null);`);

    this.addSql(`create table "study" ("id" serial primary key, "title" varchar(255) not null);`);

    this.addSql(
      `create table "questionnaire" ("id" serial primary key, "started_at" timestamptz not null, "ended_at" timestamptz not null, "description" varchar(255) not null, "remark" varchar(255) null, "study_id" int not null, "participant_id" int not null);`
    );

    this.addSql(
      `create table "entry" ("id" serial primary key, "started_at" time not null, "ended_at" time not null, "weekday" int not null, "weekly_recurring" int not null default 1, "questionnaire_id" int not null, "carer_id" int not null);`
    );

    this.addSql(
      `create table "entry_language" ("id" serial primary key, "ratio" varchar(255) not null, "language_id" int not null, "entry_id" int not null);`
    );

    this.addSql(
      `alter table "language" add constraint "language_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(
      `alter table "carer" add constraint "carer_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "entry" add constraint "entry_questionnaire_id_foreign" foreign key ("questionnaire_id") references "questionnaire" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "entry" add constraint "entry_carer_id_foreign" foreign key ("carer_id") references "carer" ("id") on update cascade;`
    );

    this.addSql(
      `alter table "entry_language" add constraint "entry_language_language_id_foreign" foreign key ("language_id") references "language" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "entry_language" add constraint "entry_language_entry_id_foreign" foreign key ("entry_id") references "entry" ("id") on update cascade;`
    );

    this.addSql(`alter table "user" add column "role" "UserRole" not null default 'ASSISTANT';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "language" drop constraint "language_participant_id_foreign";`);

    this.addSql(`alter table "carer" drop constraint "carer_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "entry_language" drop constraint "entry_language_language_id_foreign";`);

    this.addSql(`alter table "entry" drop constraint "entry_carer_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_study_id_foreign";`);

    this.addSql(`alter table "entry" drop constraint "entry_questionnaire_id_foreign";`);

    this.addSql(`alter table "entry_language" drop constraint "entry_language_entry_id_foreign";`);

    this.addSql(`drop table if exists "participant" cascade;`);

    this.addSql(`drop table if exists "language" cascade;`);

    this.addSql(`drop table if exists "carer" cascade;`);

    this.addSql(`drop table if exists "study" cascade;`);

    this.addSql(`drop table if exists "questionnaire" cascade;`);

    this.addSql(`drop table if exists "entry" cascade;`);

    this.addSql(`drop table if exists "entry_language" cascade;`);

    this.addSql(`alter table "user" drop column "role";`);

    this.addSql(`drop type "UserRole";`);
  }
}
