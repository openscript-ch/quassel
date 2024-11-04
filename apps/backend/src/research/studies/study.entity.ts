import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Questionnaire } from "../questionnaires/questionnaire.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  title!: string;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.study)
  questionnaires = new Collection<Questionnaire>(this);
}
