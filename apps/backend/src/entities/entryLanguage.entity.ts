import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";
import { Entry } from "./entry.entity";
import { Language } from "./language.entity";

@Entity()
export class EntryLanguage extends BaseEntity {
  @Property()
  ration!: string;

  @ManyToOne()
  language!: Language;

  @ManyToOne()
  entry!: Entry;
}
