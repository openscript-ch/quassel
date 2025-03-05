import { Migration } from '@mikro-orm/migrations';
import { Questionnaire } from '../../src/research/questionnaires/questionnaire.entity';

export class Migration20250305095459 extends Migration {

  override async up(): Promise<void> {
    const em = this.getEntityManager();
    const qb = em.createQueryBuilder(Questionnaire)

    this.addSql(`create table "study_participants" ("study_id" int not null, "participant_id" bigint not null, constraint "study_participants_pkey" primary key ("study_id", "participant_id"));`);

    this.addSql(`alter table "study_participants" add constraint "study_participants_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "study_participants" add constraint "study_participants_participant_id_foreign" foreign key ("participant_id") references "participant" ("id") on update cascade on delete cascade;`);

    const questionnaires = await qb.select(["participant_id","study_id"]).distinct().execute<{ participant: number, study_id: number }[]>()

    for (const { participant, study_id } of questionnaires) {
      this.addSql(`insert into "study_participants" ("study_id", "participant_id") values (${study_id}, ${participant});`);
    }

    this.addSql(`alter table "questionnaire" drop constraint "questionnaire_study_id_foreign";`);

    this.addSql(`alter table "questionnaire" drop column "study_id";`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "study_participants" cascade;`);

    this.addSql(`alter table "questionnaire" add column "study_id" int not null;`);
    this.addSql(`alter table "questionnaire" add constraint "questionnaire_study_id_foreign" foreign key ("study_id") references "study" ("id") on update cascade;`);
  }

}
