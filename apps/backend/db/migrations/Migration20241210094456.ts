import { Migration } from "@mikro-orm/migrations";

export class Migration20241210094456 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "entry_language" drop constraint "entry_language_entry_id_foreign";`);

    this.addSql(`alter table "entry_language" alter column "entry_id" type int using ("entry_id"::int);`);
    this.addSql(`alter table "entry_language" alter column "entry_id" drop not null;`);
    this.addSql(
      `alter table "entry_language" add constraint "entry_language_entry_id_foreign" foreign key ("entry_id") references "entry" ("id") on update cascade on delete cascade;`
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "entry_language" drop constraint "entry_language_entry_id_foreign";`);

    this.addSql(`alter table "entry_language" alter column "entry_id" type int using ("entry_id"::int);`);
    this.addSql(`alter table "entry_language" alter column "entry_id" set not null;`);
    this.addSql(
      `alter table "entry_language" add constraint "entry_language_entry_id_foreign" foreign key ("entry_id") references "entry" ("id") on update cascade;`
    );
  }
}
