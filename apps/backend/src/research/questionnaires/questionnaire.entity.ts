import { Collection, Entity, Formula, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../participants/participant.entity";
import { Entry } from "../entries/entry.entity";

@Entity()
export class Questionnaire extends BaseEntity {
  @Property()
  startedAt: Date;

  @Property()
  endedAt: Date;

  @Property()
  title: string;

  @Property({ columnType: "text" })
  remark?: string;

  @Property({ defaultRaw: "NOW()" })
  createdAt!: Date;

  @Property()
  completedAt?: Date;

  @ManyToOne()
  participant: Participant;

  @OneToMany(() => Entry, (entry) => entry.questionnaire)
  entries = new Collection<Entry>(this);

  @Formula((alias) => `(EXTRACT (EPOCH FROM ${alias}.ended_at - ${alias}.started_at))::integer`)
  duration!: number;
}
