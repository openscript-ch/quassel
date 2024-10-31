import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../../entities/participant.entity";
import { Entry } from "../../entities/entry.entity";

@Entity()
export class Carer extends BaseEntity {
  @Property({ unique: true })
  name!: string;

  @ManyToOne()
  participant?: Participant;

  @OneToMany(() => Entry, (entry) => entry.carer)
  entries = new Collection<Entry>(this);
}