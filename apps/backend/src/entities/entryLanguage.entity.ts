import { Check, Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/entities/base.entity";
import { Entry } from "./entry.entity";
import { Language } from "../defaults/entities/language.entity";

@Entity()
export class EntryLanguage extends BaseEntity {
  @Property({ columnType: "smallint" })
  @Check<EntryLanguage>({ expression: (columns) => `${columns.ratio} > 0 AND ${columns.ratio} <= 100` })
  ratio!: number;

  @ManyToOne()
  language!: Language;

  @ManyToOne()
  entry!: Entry;
}
