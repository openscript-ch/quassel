import { Migration } from "@mikro-orm/migrations";

export class Migration20241031114033 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "carer" add constraint "carer_name_unique" unique ("name");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "carer" drop constraint "carer_name_unique";`);
  }
}
