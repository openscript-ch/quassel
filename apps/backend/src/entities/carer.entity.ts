import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Participant } from "./participant.entity";
import { Entry } from "./entry.entity";

@Entity()
export class Carer extends BaseEntity {
  @Property()
  name!: string;

  @ManyToOne()
  participant?: Participant;

  @OneToMany(() => Entry, (entry) => entry.carer)
  entries = new Collection<Entry>(this);
}
