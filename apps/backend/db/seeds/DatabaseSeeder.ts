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
import { StudyCreationDto } from "../../src/research/studies/study.dto";
import { Study } from "../../src/research/studies/study.entity";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager) {
    const users: UserCreationDto[] = [
      {
        role: UserRole.ADMIN,
        email: "admin@example.com",
        password: await getPasswordHash("Lemon*1234"),
      },
      {
        role: UserRole.ASSISTANT,
        email: "assistant@example.com",
        password: await getPasswordHash("Lemon*1234"),
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

    const studies: StudyCreationDto[] = [
      {
        id: 700,
        title: "Frühjahr 2025",
      },
      {
        id: 800,
        title: "Herbst 2025",
      },
      {
        id: 900,
        title: "Herbst 2025",
      },
    ];

    const carers: CarerCreationDto[] = [
      { name: "Mutter, Mother", color: "#BF0D3E" },
      { name: "Vater, Father", color: "#0028A5" },
      { name: "Grossmutter, Grandmother", color: "#F3537F" },
      { name: "Grossvater, Grandfather", color: "#3062FF" },
      { name: "Schwester, Sister", color: "#FBC6D4" },
      { name: "Bruder, Brother", color: "#BACBFF" },
      { name: "Tante, Aunt", color: "#8F0A2E" },
      { name: "Onkel, Uncle", color: "#001E7C" },
      { name: "KiTa, Day care centre", color: "#FFF4DA" },
      { name: "Spielgruppe, Playgroup", color: "#ECF6D6" },
      { name: "Turnen, Gymnastics", color: "#FFE9B5" },
      { name: "Kindergarten, Kindergarten", color: "#DBEDAD" },
      { name: "Hort, After-school care", color: "#FFDE8F" },
      { name: "Kinderbetreuung, Nanny / Babysitter", color: "#FEB799" },
      { name: "Nachbar, Neighbour", color: "#FC4C02" },
    ];

    const languages: LanguageCreationDto[] = [
      { name: "Deutsch (Schweiz), German (Switzerland)", ietfBcp47: "de-CH" },
      { name: "Deutsch (Österreich), German (Austria)", ietfBcp47: "de-AT" },
      { name: "Deutsch (Liechtenstein), German (Liechtenstein)", ietfBcp47: "de-LI" },
      { name: "Deutsch (Luxemburg), German (Luxemburg)", ietfBcp47: "de-LU" },
      { name: "Deutsch (Belgien), German (Belgium)", ietfBcp47: "de-BE" },
      { name: "Französisch (Schweiz), French (Switzerland)", ietfBcp47: "fr-CH" },
      { name: "Französisch (Belgien), French (Belgium)", ietfBcp47: "fr-BE" },
      { name: "Französisch (Luxembourg), French (Luxembourg)", ietfBcp47: "fr-LU" },
      { name: "Französisch (Monaco), French (Monaco)", ietfBcp47: "fr-MC" },
      { name: "Italienisch (Schweiz), Italian (Switzerland)", ietfBcp47: "it-CH" },
      { name: "Romanisch Surselvisch, Surselvisch Romontsch", ietfBcp47: "rm-sursilv" },
      { name: "Romanisch Vallader, Vallader Romontsch", ietfBcp47: "rm-vallader" },
      { name: "Romanisch Puter, Puter Romontsch", ietfBcp47: "rm-puter" },
      { name: "Romanisch Grischun, Rumantsch Grischun", ietfBcp47: "rm" },
      { name: "Englisch (Vereinigtes Königreich), English (United Kingdom)", ietfBcp47: "en-GB" },
      { name: "Englisch (Vereinigte Staaten), English (United States)", ietfBcp47: "en-US" },
      { name: "Englisch (Irland), English (Ireland)", ietfBcp47: "en-IE" },
      { name: "Spanisch (Spanien), Spanish (Spain)", ietfBcp47: "es-ES" },
      { name: "Spanisch (Andorra), Spanish (Andorra)", ietfBcp47: "es-AD" },
      { name: "Katalanisch (Spanien), Catalan (Spain)", ietfBcp47: "ca-ES" },
      { name: "Katalanisch (Andorra), Catalan (Andorra)", ietfBcp47: "ca-AD" },
      { name: "Portugiesisch (Portugal), Portuguese (Portugal)", ietfBcp47: "pt-PT" },
      { name: "Italienisch (Italien), Italian (Italy)", ietfBcp47: "it-IT" },
      { name: "Französisch (Frankreich), French (France)", ietfBcp47: "fr-FR" },
      { name: "Niederländisch (Niederlande), Dutch (Netherlands)", ietfBcp47: "nl-NL" },
      { name: "Niederländisch (Belgien), Dutch (Belgium)", ietfBcp47: "nl-BE" },
      { name: "Dänisch (Dänemark), Danish (Denmark)", ietfBcp47: "da-DK" },
      { name: "Schwedisch (Schweden), Swedish (Sweden)", ietfBcp47: "sv-SE" },
      { name: "Norwegisch (Norwegen), Norwegian (Norway)", ietfBcp47: "no-NO" },
      { name: "Finnisch (Finnland), Finnish (Finland)", ietfBcp47: "fi-FI" },
      { name: "Isländisch (Island), Icelandic (Iceland)", ietfBcp47: "is-IS" },
      { name: "Estnisch (Estland), Estonian (Estonia)", ietfBcp47: "et-EE" },
      { name: "Lettisch (Lettland), Latvian (Latvia)", ietfBcp47: "lv-LV" },
      { name: "Litauisch (Litauen), Lithuanian (Lithuania)", ietfBcp47: "lt-LT" },
      { name: "Polnisch (Polen), Polish (Poland)", ietfBcp47: "pl-PL" },
      { name: "Tschechisch (Tschechien), Czech (Czech Republic)", ietfBcp47: "cs-CZ" },
      { name: "Slowakisch (Slowakei), Slovak (Slovakia)", ietfBcp47: "sk-SK" },
      { name: "Ungarisch (Ungarn), Hungarian (Hungary)", ietfBcp47: "hu-HU" },
      { name: "Rumänisch (Rumänien), Romanian (Romania)", ietfBcp47: "ro-RO" },
      { name: "Bulgarisch (Bulgarien), Bulgarian (Bulgaria)", ietfBcp47: "bg-BG" },
      { name: "Griechisch (Griechenland), Greek (Greece)", ietfBcp47: "el-GR" },
      { name: "Türkisch (Türkei), Turkish (Turkey)", ietfBcp47: "tr-TR" },
      { name: "Russisch (Russland), Russian (Russia)", ietfBcp47: "ru-RU" },
      { name: "Belarussisch (Weissrussland), Belarusian (Belarus)", ietfBcp47: "be-BY" },
      { name: "Ukrainisch (Ukraine), Ukrainian (Ukraine)", ietfBcp47: "uk-UA" },
      { name: "Serbisch (Serbien), Serbian (Serbia)", ietfBcp47: "sr-RS" },
      { name: "Kroatisch (Kroatien), Croatian (Croatia)", ietfBcp47: "hr-HR" },
      { name: "Bosnisch (Bosnien), Bosnian (Bosnia)", ietfBcp47: "bs-BA" },
      { name: "Slowenisch (Slowenien), Slovenian (Slovenia)", ietfBcp47: "sl-SI" },
      { name: "Albanisch (Albanien), Albanian (Albania)", ietfBcp47: "sq-AL" },
      { name: "Mazedonisch (Nordmazedonien), Macedonian (North Macedonia)", ietfBcp47: "mk-MK" },
      { name: "Montenegrinisch (Montenegro), Montenegrin (Montenegro)", ietfBcp47: "sr-ME" },
      { name: "Arabisch (Ägypten), Arabic (Egypt)", ietfBcp47: "ar-EG" },
      { name: "Arabisch (Saudi-Arabien), Arabic (Saudi Arabia)", ietfBcp47: "ar-SA" },
      { name: "Arabisch (Vereinigte Arabische Emirate), Arabic (UAE)", ietfBcp47: "ar-AE" },
      { name: "Mandarin (China), Mandarin Chinese (China)", ietfBcp47: "zh-CN" },
      { name: "Mandarin (Taiwan), Mandarin Chinese (Taiwan)", ietfBcp47: "zh-TW" },
      { name: "Hindi (Indien), Hindi (India)", ietfBcp47: "hi-IN" },
      { name: "Bengalisch (Bangladesch), Bengali (Bangladesh)", ietfBcp47: "bn-BD" },
      { name: "Bengalisch (Indien), Bengali (India)", ietfBcp47: "bn-IN" },
      { name: "Japanisch (Japan), Japanese (Japan)", ietfBcp47: "ja-JP" },
      { name: "Koreanisch (Südkorea), Korean (South Korea)", ietfBcp47: "ko-KR" },
      { name: "Vietnamesisch (Vietnam), Vietnamese (Vietnam)", ietfBcp47: "vi-VN" },
      { name: "Thailändisch (Thailand), Thai (Thailand)", ietfBcp47: "th-TH" },
      { name: "Malayisch (Malaysia), Malay (Malaysia)", ietfBcp47: "ms-MY" },
      { name: "Tamil (Indien), Tamil (India)", ietfBcp47: "ta-IN" },
      { name: "Telugu (Indien), Telugu (India)", ietfBcp47: "te-IN" },
      { name: "Swahili (Kenia), Swahili (Kenya)", ietfBcp47: "sw-KE" },
      { name: "Swahili (Tansania), Swahili (Tanzania)", ietfBcp47: "sw-TZ" },
      { name: "Persisch (Iran), Persian (Iran)", ietfBcp47: "fa-IR" },
      { name: "Urdu (Pakistan), Urdu (Pakistan)", ietfBcp47: "ur-PK" },
      { name: "Paschtunisch (Afghanistan), Pashto (Afghanistan)", ietfBcp47: "ps-AF" },
      { name: "Türkisch (Türkei), Turkish (Turkey)", ietfBcp47: "tr-TR" },
      { name: "Hebräisch (Israel), Hebrew (Israel)", ietfBcp47: "he-IL" },
      { name: "Javanisch (Indonesien), Javanese (Indonesia)", ietfBcp47: "jv-ID" },
      { name: "Punjabi (Indien), Punjabi (India)", ietfBcp47: "pa-IN" },
      { name: "Punjabi (Pakistan), Punjabi (Pakistan)", ietfBcp47: "pa-PK" },
      { name: "Gujarati (Indien), Gujarati (India)", ietfBcp47: "gu-IN" },
      { name: "Kannada (Indien), Kannada (India)", ietfBcp47: "kn-IN" },
      { name: "Marathi (Indien), Marathi (India)", ietfBcp47: "mr-IN" },
      { name: "Odia (Indien), Odia (India)", ietfBcp47: "or-IN" },
      { name: "Sinhala (Sri Lanka), Sinhala (Sri Lanka)", ietfBcp47: "si-LK" },
      { name: "Burmese (Myanmar), Burmese (Myanmar)", ietfBcp47: "my-MM" },
      { name: "Khmer (Kambodscha), Khmer (Cambodia)", ietfBcp47: "km-KH" },
      { name: "Lao (Laos), Lao (Laos)", ietfBcp47: "lo-LA" },
      { name: "Mongolisch (Mongolei), Mongolian (Mongolia)", ietfBcp47: "mn-MN" },
      { name: "Nepali (Nepal), Nepali (Nepal)", ietfBcp47: "ne-NP" },
      { name: "Singhalesisch (Sri Lanka), Sinhala (Sri Lanka)", ietfBcp47: "si-LK" },
      { name: "Tagalog (Philippinen), Tagalog (Philippines)", ietfBcp47: "tl-PH" },
      { name: "Amharisch (Äthiopien), Amharic (Ethiopia)", ietfBcp47: "am-ET" },
      { name: "Somali (Somalia), Somali (Somalia)", ietfBcp47: "so-SO" },
      { name: "Zulu (Südafrika), Zulu (South Africa)", ietfBcp47: "zu-ZA" },
      { name: "Xhosa (Südafrika), Xhosa (South Africa)", ietfBcp47: "xh-ZA" },
      { name: "Afrikaans (Südafrika), Afrikaans (South Africa)", ietfBcp47: "af-ZA" },
      { name: "Hausa (Nigeria), Hausa (Nigeria)", ietfBcp47: "ha-NG" },
      { name: "Igbo (Nigeria), Igbo (Nigeria)", ietfBcp47: "ig-NG" },
      { name: "Yoruba (Nigeria), Yoruba (Nigeria)", ietfBcp47: "yo-NG" },
      { name: "Maori (Neuseeland), Maori (New Zealand)", ietfBcp47: "mi-NZ" },
    ];

    em.persist([
      ...users.map((user) => em.create(User, user)),
      ...participants.map((participant) => em.create(Participant, participant)),
      ...studies.map((study) => em.create(Study, study)),
      ...carers.map((carer) => em.create(Carer, carer)),
      ...languages.map((language) => em.create(Language, language)),
    ]);

    await em.flush();
  }
}
