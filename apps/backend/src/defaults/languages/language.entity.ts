import { Collection, Entity, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../../common/entities/base.entity";
import { Participant } from "../../research/participants/participant.entity";
import { EntryLanguage } from "../../research/entry-languages/entry-language.entity";

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
