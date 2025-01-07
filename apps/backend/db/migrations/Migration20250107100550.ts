import { Migration } from '@mikro-orm/migrations';

export class Migration20250107100550 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "questionnaire" add column "created_at" timestamptz not null default now();`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "questionnaire" drop column "created_at";`);
  }

}
