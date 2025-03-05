import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../participants/participant.entity";

@Entity()
export class Study extends BaseEntity {
  @Property()
  title!: string;

  @ManyToMany(() => Participant)
  participants = new Collection<Participant>(this);
}
