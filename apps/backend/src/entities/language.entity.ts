import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../base.entity";
import { Participant } from "./participant.entity";
import { EntryLanguage } from "./entryLanguage.entity";

@Entity()
export class Language extends BaseEntity {
  @Property()
  name!: string;

  @Property({ length: 50 })
  ietfBcp47?: string;

  @ManyToOne()
  participant?: Participant;

  @OneToMany(() => EntryLanguage, (entryLanguage) => entryLanguage.language)
  entryLanguages = new Collection<EntryLanguage>(this);
}
