import { Migration } from "@mikro-orm/migrations";

export class Migration20241014153150 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`create type "Weekday" as enum ('monday', 'tueseday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');`);
    this.addSql(`create type "RecurringRule" as enum ('every-2-weeks');`);
    this.addSql(
      `create table "exposure_entry" ("id" serial primary key, "start" time not null, "end" time not null, "weekday" "Weekday" not null, "recurring_rule" "RecurringRule" null);`
    );

    this.addSql(`create table "language_value" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "participant" ("id" serial primary key);`);

    this.addSql(`create table "person_value" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "study" ("id" serial primary key, "title" varchar(255) not null);`);

    this.addSql(
      `create table "questionnaire" ("id" serial primary key, "start_date" timestamptz not null, "end_date" timestamptz not null, "description" varchar(255) not null, "remark" varchar(255) null, "study_id" int not null, "participant_id" int not null);`
    );

    this.addSql(`create table "user" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);

    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade;`
    );
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_study_id_foreign";`);

    this.addSql(`drop table if exists "exposure_entry" cascade;`);

    this.addSql(`drop table if exists "language_value" cascade;`);

    this.addSql(`drop table if exists "participant" cascade;`);

    this.addSql(`drop table if exists "person_value" cascade;`);

    this.addSql(`drop table if exists "study" cascade;`);

    this.addSql(`drop table if exists "questionnaire" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop type "Weekday";`);
    this.addSql(`drop type "RecurringRule";`);
  }
}
