import { Cascade, Check, Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Language } from "../../defaults/languages/language.entity";
import { Entry } from "../entries/entry.entity";

@Entity()
export class EntryLanguage extends BaseEntity {
  @Property({ columnType: "smallint" })
  @Check<EntryLanguage>({ expression: (columns) => `${columns.ratio} > 0 AND ${columns.ratio} <= 100` })
  ratio!: number;

  @ManyToOne()
  language!: Language;

  @ManyToOne({ cascade: [Cascade.ALL] })
  entry!: Entry;
}
