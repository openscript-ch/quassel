import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";
import { Questionnaire } from "./questionnaire.entity";
import { Carer } from "./carer.entity";
import { Language } from "./language.entity";

@Entity()
export class Participant extends BaseEntity {
  @Property()
  birthday?: Date;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.participant)
  questionnaires = new Collection<Questionnaire>(this);

  @OneToMany(() => Carer, (carer) => carer.participant)
  carers = new Collection<Carer>(this);

  @OneToMany(() => Language, (language) => language.participant)
  languages = new Collection<Language>(this);
}
