import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Questionnaire } from "./questionnaire.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  title!: string;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.study)
  questionnaires = new Collection<Questionnaire>(this);
}
