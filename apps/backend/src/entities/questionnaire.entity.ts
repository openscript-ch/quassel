import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Study } from "./study.entity";
import { Participant } from "./participant.entity";

@Entity()
export class Questionnaire extends BaseEntity {
  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  description!: string;

  @Property()
  remark?: string;

  @ManyToOne()
  study!: Study;

  @ManyToOne()
  participant!: Participant;
}
