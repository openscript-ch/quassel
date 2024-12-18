import { Migration } from "@mikro-orm/migrations";

export class Migration20241217101643 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "carer" add column "color" varchar(255) null;`);
    this.addSql(`alter table "carer" add constraint carer_color_check check(color ~* '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\$');`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "carer" drop constraint carer_color_check;`);
    this.addSql(`alter table "carer" drop column "color";`);
  }
}
