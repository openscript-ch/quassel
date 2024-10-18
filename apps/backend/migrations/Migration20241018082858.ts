import { Migration } from "@mikro-orm/migrations";

export class Migration20241018082858 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create type "UserRole" as enum ('ASSISTANT', 'ADMIN');`);
    this.addSql(
      `create table "language" ("id" serial primary key, "name" varchar(255) not null, "iso693" varchar(255) null, "participant_id" int null);`
    );

    this.addSql(`create table "carer" ("id" serial primary key, "name" varchar(255) not null, "participant_id" int null);`);

    this.addSql(
      `create table "entry" ("id" serial primary key, "started_at" time not null, "ended_at" time not null, "weekday" int not null, "weekly_recurring" int not null default 1, "questionnarie_id" int not null, "carer_id" int not null);`
    );

    this.addSql(
      `create table "entry_language" ("id" serial primary key, "ration" varchar(255) not null, "language_id" int not null, "entry_id" int not null);`
    );

    this.addSql(
      `alter table "language" add constraint "language_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(
      `alter table "carer" add constraint "carer_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(
      `alter table "entry" add constraint "entry_questionnarie_id_foreign" foreign key ("questionnarie_id") references "questionnaire" ("id") on update cascade;`
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

    this.addSql(`drop table if exists "exposure_entry" cascade;`);

    this.addSql(`drop table if exists "language_value" cascade;`);

    this.addSql(`drop table if exists "person_value" cascade;`);

    this.addSql(`alter table "questionnaire" drop column "start_date", drop column "end_date";`);

    this.addSql(`alter table "questionnaire" add column "started_at" timestamptz not null, add column "ended_at" timestamptz not null;`);

    this.addSql(`alter table "user" add column "role" "UserRole" not null default 'ASSISTANT';`);

    this.addSql(`drop type "Weekday";`);
    this.addSql(`drop type "RecurringRule";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create type "Weekday" as enum ('monday', 'tueseday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');`);
    this.addSql(`create type "RecurringRule" as enum ('every-2-weeks');`);
    this.addSql(`alter table "entry_language" drop constraint "entry_language_language_id_foreign";`);

    this.addSql(`alter table "entry" drop constraint "entry_carer_id_foreign";`);

    this.addSql(`alter table "entry_language" drop constraint "entry_language_entry_id_foreign";`);

    this.addSql(
      `create table "exposure_entry" ("id" serial primary key, "start" time not null, "end" time not null, "weekday" "Weekday" not null, "recurring_rule" "RecurringRule" null);`
    );

    this.addSql(`create table "language_value" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "person_value" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`drop table if exists "language" cascade;`);

    this.addSql(`drop table if exists "carer" cascade;`);

    this.addSql(`drop table if exists "entry" cascade;`);

    this.addSql(`drop table if exists "entry_language" cascade;`);

    this.addSql(`alter table "questionnaire" drop column "started_at", drop column "ended_at";`);

    this.addSql(`alter table "questionnaire" add column "start_date" timestamptz not null, add column "end_date" timestamptz not null;`);

    this.addSql(`alter table "user" drop column "role";`);

    this.addSql(`drop type "UserRole";`);
  }
}
