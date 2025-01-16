import { Check, Collection, Entity, ManyToOne, OneToMany, Property, Formula } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../../research/participants/participant.entity";
import { Entry } from "../../research/entries/entry.entity";

@Entity()
export class Carer extends BaseEntity {
  @Property({ unique: true })
  name!: string;

  @Check<Carer>({ expression: (columns) => `${columns.color} ~* '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'` })
  @Property()
  color?: string;

  @ManyToOne()
  participant?: Participant;

  @OneToMany(() => Entry, (entry) => entry.carer)
  entries = new Collection<Entry>(this);

  @Formula((alias) => `(select count(*) from entry e where e.carer_id = ${alias}.id)`, { lazy: true })
  entriesCount? = 0;
}
