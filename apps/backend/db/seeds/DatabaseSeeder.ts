import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../../src/system/users/user.entity";
import { getPasswordHash } from "../../src/common/utils/encrypt";
import { Carer } from "../../src/defaults/carers/carer.entity";
import { Participant } from "../../src/research/participants/participant.entity";
import { Language } from "../../src/defaults/languages/language.entity";
import { LanguageCreationDto } from "../../src/defaults/languages/language.dto";
import { CarerCreationDto } from "../../src/defaults/carers/carer.dto";
import { ParticipantCreationDto } from "../../src/research/participants/participant.dto";
import { UserCreationDto } from "../../src/system/users/user.dto";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager) {
    const users: UserCreationDto[] = [
      {
        role: UserRole.ADMIN,
        email: "admin@example.com",
        password: await getPasswordHash("Quassel*1234"),
      },
      {
        role: UserRole.ASSISTANT,
        email: "assistant@example.com",
        password: await getPasswordHash("Quassel*1234"),
      },
    ];

    const participants: ParticipantCreationDto[] = [
      {
        id: 1000,
        birthday: new Date("2023-03-01"),
      },
      {
        id: 2000,
        birthday: new Date("2024-06-01"),
      },
      {
        id: 3000,
        birthday: new Date("2024-09-01"),
      },
    ];

    const carers: CarerCreationDto[] = [
      { name: "Mutter, Mother" },
      { name: "Vater, Father" },
      { name: "Grossmutter, Grandmother" },
      { name: "Grossvater, Grandfather" },
      { name: "Schwester, Sister" },
      { name: "Bruder, Brother" },
      { name: "Tante, Aunt" },
      { name: "Onkel, Uncle" },
      { name: "Onkel, Uncle" },
      { name: "KiTa, Day care centre" },
      { name: "Spielgruppe, Playgroup" },
      { name: "Turnen, Gymnastics" },
      { name: "Kindergarten, Kindergarten" },
      { name: "Hort, After-school care" },
      { name: "Nanny / Babysitter" },
      { name: "Nachbar, Neighbour" },
    ];

    const languages: LanguageCreationDto[] = [
      { name: "Deutsch", ietfBcp47: "de" },
      { name: "English", ietfBcp47: "en" },
      { name: "Français", ietfBcp47: "fr" },
      { name: "Italiano", ietfBcp47: "it" },
      { name: "Español", ietfBcp47: "es" },
      { name: "Português", ietfBcp47: "pt" },
      { name: "Nederlands", ietfBcp47: "nl" },
      { name: "Dansk", ietfBcp47: "da" },
      { name: "Svenska", ietfBcp47: "sv" },
      { name: "Norsk", ietfBcp47: "no" },
      { name: "Suomi", ietfBcp47: "fi" },
      { name: "Polski", ietfBcp47: "pl" },
      { name: "Čeština", ietfBcp47: "cs" },
      { name: "Slovenčina", ietfBcp47: "sk" },
      { name: "Magyar", ietfBcp47: "hu" },
      { name: "Română", ietfBcp47: "ro" },
      { name: "Български", ietfBcp47: "bg" },
      { name: "Русский", ietfBcp47: "ru" },
      { name: "Українська", ietfBcp47: "uk" },
      { name: "العربية", ietfBcp47: "ar" },
      { name: "עברית", ietfBcp47: "he" },
      { name: "हिन्दी", ietfBcp47: "hi" },
      { name: "বাংলা", ietfBcp47: "bn" },
      { name: "日本語", ietfBcp47: "ja" },
      { name: "中文", ietfBcp47: "zh" },
      { name: "한국어", ietfBcp47: "ko" },
      { name: "Tiếng Việt", ietfBcp47: "vi" },
      { name: "Deutsch (Schweiz)", ietfBcp47: "de-CH" },
      { name: "Deutsch (Österreich)", ietfBcp47: "de-AT" },
      { name: "Deutsch (Liechtenstein)", ietfBcp47: "de-LI" },
      { name: "Deutsch (Luxemburg)", ietfBcp47: "de-LU" },
      { name: "Deutsch (Belgien)", ietfBcp47: "de-BE" },
      { name: "Français (Suisse)", ietfBcp47: "fr-CH" },
      { name: "Français (Belgique)", ietfBcp47: "fr-BE" },
      { name: "Français (Luxembourg)", ietfBcp47: "fr-LU" },
      { name: "Français (Monaco)", ietfBcp47: "fr-MC" },
      { name: "Italiano (Svizzera)", ietfBcp47: "it-CH" },
      { name: "Italiano (San Marino)", ietfBcp47: "it-SM" },
      { name: "Surselvisch Romontsch", ietfBcp47: "rm-sursilv" },
      { name: "Vallader Romontsch", ietfBcp47: "rm-vallader" },
      { name: "Puter Romontsch", ietfBcp47: "rm-puter" },
      { name: "Rumantsch Grischun", ietfBcp47: "rm" },
    ];

    em.persist([
      ...users.map((user) => em.create(User, user)),
      ...participants.map((participant) => em.create(Participant, participant)),
      ...carers.map((carer) => em.create(Carer, carer)),
      ...languages.map((language) => em.create(Language, language)),
    ]);

    await em.flush();
  }
}
