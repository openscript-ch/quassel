import { Cascade, Check, Collection, Entity, ManyToOne, OneToMany, Opt, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Carer } from "../../defaults/carers/carer.entity";
import { EntryLanguage } from "../entry-languages/entry-language.entity";
import { Questionnaire } from "../questionnaires/questionnaire.entity";

@Entity()
export class Entry extends BaseEntity {
  @Property({ columnType: "time" })
  startedAt!: string;

  @Property({ columnType: "time" })
  endedAt!: string;

  /**
   * Sunday is 0 (like in JS)
   */
  @Property({ columnType: "smallint" })
  @Check<Entry>({ expression: (columns) => `${columns.weekday} >= 0 AND ${columns.weekday} < 7` })
  weekday!: number;

  @Property({ default: 1, columnType: "smallint" })
  @Check<Entry>({ expression: (columns) => `${columns.weeklyRecurring} >= 1` })
  weeklyRecurring!: number & Opt;

  @ManyToOne({ cascade: [Cascade.ALL] })
  questionnaire!: Questionnaire;

  @ManyToOne()
  carer!: Carer;

  @OneToMany(() => EntryLanguage, (entryLanguage) => entryLanguage.entry, { orphanRemoval: true })
  entryLanguages = new Collection<EntryLanguage>(this);
}
