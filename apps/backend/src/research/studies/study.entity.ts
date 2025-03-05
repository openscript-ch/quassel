import { Collection, Entity, Formula, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../participants/participant.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  title!: string;

  @ManyToMany(() => Participant)
  participants = new Collection<Participant>(this);

  @Formula((alias) => `(select count(*) from study_participants where study_id = ${alias}.id)`)
  participantsCount? = 0;
}
