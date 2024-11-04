import { Migration } from "@mikro-orm/migrations";

export class Migration20241031122518 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "language" drop constraint "language_participant_id_foreign";`);

    this.addSql(`alter table "carer" drop constraint "carer_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "participant" alter column "id" type bigint using ("id"::bigint);`);

    this.addSql(`alter table "language" alter column "participant_id" type bigint using ("participant_id"::bigint);`);
    this.addSql(
      `alter table "language" add constraint "language_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(`alter table "carer" alter column "participant_id" type bigint using ("participant_id"::bigint);`);
    this.addSql(
      `alter table "carer" add constraint "carer_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(`alter table "questionnaire" alter column "participant_id" type bigint using ("participant_id"::bigint);`);
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "language" drop constraint "language_participant_id_foreign";`);

    this.addSql(`alter table "carer" drop constraint "carer_participant_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_participant_id_foreign";`);

    this.addSql(`alter table "participant" alter column "id" type int using ("id"::int);`);

    this.addSql(`alter table "language" alter column "participant_id" type int using ("participant_id"::int);`);
    this.addSql(
      `alter table "language" add constraint "language_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(`alter table "carer" alter column "participant_id" type int using ("participant_id"::int);`);
    this.addSql(
      `alter table "carer" add constraint "carer_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete set null;`
    );

    this.addSql(`alter table "questionnaire" alter column "participant_id" type int using ("participant_id"::int);`);
    this.addSql(
      `alter table "questionnaire" add constraint "questionnaire_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade;`
    );
  }
}
