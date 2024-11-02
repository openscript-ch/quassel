import { Check, Collection, Entity, ManyToOne, OneToMany, Opt, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { EntryLanguage } from "./entryLanguage.entity";
import { Carer } from "../../defaults/carers/carer.entity";
import { Questionnaire } from "./questionnaire.entity";

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
  @Check<Entry>({ expression: (columns) => `${columns.weekday} >= 1` })
  weeklyRecurring!: number & Opt;

  @ManyToOne()
  questionnaire!: Questionnaire;

  @ManyToOne()
  carer!: Carer;

  @OneToMany(() => EntryLanguage, (entryLanguage) => entryLanguage.entry)
  entryLanguages = new Collection<EntryLanguage>(this);
}
