import { Collection, Entity, OneToMany } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Questionnaire } from "./questionnaire.entity";

@Entity()
export class Participant extends BaseEntity {
  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.participant)
  questionnaires = new Collection<Questionnaire>(this);
}
