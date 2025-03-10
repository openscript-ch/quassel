import { BaseEntity, Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Carer } from "../../defaults/carers/carer.entity";
import { Language } from "../../defaults/languages/language.entity";
import { Questionnaire } from "../questionnaires/questionnaire.entity";
import { Study } from "../studies/study.entity";

@Entity()
export class Participant extends BaseEntity {
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

  @ManyToMany(() => Study, (study) => study.participants)
  studies = new Collection<Study>(this);
}
