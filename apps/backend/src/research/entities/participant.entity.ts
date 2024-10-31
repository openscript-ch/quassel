import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Questionnaire } from "./questionnaire.entity";
import { Carer } from "../../defaults/entities/carer.entity";
import { Language } from "../../defaults/entities/language.entity";

@Entity()
export class Participant {
  @PrimaryKey({ columnType: "bigint" })
  id!: number;

  @Property()
  birthday?: Date;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.participant)
  questionnaires = new Collection<Questionnaire>(this);

  @OneToMany(() => Carer, (carer) => carer.participant)
  carers = new Collection<Carer>(this);

  @OneToMany(() => Language, (language) => language.participant)
  languages = new Collection<Language>(this);
}
