import { Collection, Entity, Formula, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Questionnaire } from "../questionnaires/questionnaire.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  title!: string;

  @OneToMany(() => Questionnaire, (questionnaire) => questionnaire.study)
  questionnaires = new Collection<Questionnaire>(this);

  @Formula((alias) => `(select count(*) from questionnaire q where q.study_id = ${alias}.id)`)
  questionnairesCount? = 0;
}
