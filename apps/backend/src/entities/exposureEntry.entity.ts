import { Entity, Enum, Property } from "@mikro-orm/core";
import { BaseEntity } from "./base.entity";

@Entity()
export class ExposureEntry extends BaseEntity {
  @Property({ columnType: "time" })
  start!: string;

  @Property({ columnType: "time" })
  end!: string;

  @Enum({ items: () => Weekday, nativeEnumName: "Weekday" })
  weekday!: Weekday;

  @Enum({ items: () => RecurringRule, nativeEnumName: "RecurringRule" })
  recurringRule?: RecurringRule;
}

export enum RecurringRule {
  every2Weeks = "every-2-weeks",
}

export enum Weekday {
  monday = "monday",
  tueseday = "tueseday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
  sunday = "sunday",
}
