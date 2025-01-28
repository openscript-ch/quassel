import { Test, TestingModule } from "@nestjs/testing";
import { ReportsService } from "./reports.service";
import { Collection, EntityManager } from "@mikro-orm/postgresql";
import { Questionnaire } from "../../research/questionnaires/questionnaire.entity";
import { Language } from "../../defaults/languages/language.entity";
import { EntryLanguage } from "../../research/entry-languages/entry-language.entity";
import { Participant } from "../../research/participants/participant.entity";
import { Entry } from "../../research/entries/entry.entity";

describe("ReportsService", () => {
  let service: ReportsService;

  let participant: Participant;
  let questionnaire: Questionnaire;
  let language1: Language;
  let language2: Language;
  let language3: Language;
  let language4: Language;
  let language5: Language;
  let entryLanguage1: EntryLanguage;
  let entryLanguage2: EntryLanguage;
  let entryLanguage3: EntryLanguage;
  let entryLanguage4: EntryLanguage;
  let entryLanguage5: EntryLanguage;
  let entry1: Entry;
  let entry2: Entry;
  let entry3: Entry;
  let entry4: Entry;
  let entry5: Entry;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);

    questionnaire = new Questionnaire();
    questionnaire.duration = 1;
    participant = new Participant();
    participant.questionnaires = new Collection(participant, [questionnaire]);
    language1 = new Language();
    language1.id = 1;
    language2 = new Language();
    language2.id = 2;
    language3 = new Language();
    language3.id = 3;
    language4 = new Language();
    language4.id = 4;
    language5 = new Language();
    language5.id = 5;
    entryLanguage1 = new EntryLanguage();
    entryLanguage1.language = language1;
    entryLanguage1.ratio = 100;
    entryLanguage2 = new EntryLanguage();
    entryLanguage2.language = language2;
    entryLanguage2.ratio = 100;
    entryLanguage3 = new EntryLanguage();
    entryLanguage3.language = language3;
    entryLanguage3.ratio = 100;
    entryLanguage4 = new EntryLanguage();
    entryLanguage4.language = language4;
    entryLanguage4.ratio = 100;
    entryLanguage5 = new EntryLanguage();
    entryLanguage5.language = language5;
    entryLanguage5.ratio = 100;
    entry1 = new Entry();
    entry1.weekday = 0;
    entry1.entryLanguages = new Collection(entry1, [entryLanguage1]);
    entry2 = new Entry();
    entry2.weekday = 0;
    entry2.entryLanguages = new Collection(entry2, [entryLanguage2]);
    entry3 = new Entry();
    entry3.weekday = 0;
    entry3.entryLanguages = new Collection(entry3, [entryLanguage3]);
    entry4 = new Entry();
    entry4.weekday = 0;
    entry4.entryLanguages = new Collection(entry4, [entryLanguage4]);
    entry5 = new Entry();
    entry5.weekday = 0;
    entry5.entryLanguages = new Collection(entry5, [entryLanguage5]);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getParticipantExposure", () => {
    it("should get durations", () => {
      entry1.startedAt = "07:00:00";
      entry1.endedAt = "08:00:00";

      entry2.startedAt = "08:00:00";
      entry2.endedAt = "09:00:00";

      questionnaire.entries = new Collection(questionnaire, [entry1, entry2]);

      const exposure = service.getParticipantExposure(participant);

      expect(exposure.get(language1)).toEqual(60 * 60);
      expect(exposure.get(language2)).toEqual(60 * 60);
    });

    it("should get durations for all types of overlapping", () => {
      entry1.startedAt = "07:00:00";
      entry1.endedAt = "17:00:00";

      entry2.startedAt = "08:00:00";
      entry2.endedAt = "13:00:00";

      entry3.startedAt = "09:00:00";
      entry3.endedAt = "10:00:00";

      entry4.startedAt = "14:00:00";
      entry4.endedAt = "15:00:00";

      entry5.startedAt = "16:00:00";
      entry5.endedAt = "19:00:00";

      questionnaire.entries = new Collection(questionnaire, [entry1, entry2, entry3, entry4, entry5]);

      const exposure = service.getParticipantExposure(participant);

      // 07:00-08:00 (100%) + 08:00-09:00 (50%) + 09:00-10:00 (33%) + 10:00-13:00 (50%) + 13:00-14:00 (100%) + 14:00-15:00 (50%) + 15:00-16:00 (100%) + 16:00-17:00 (50%)
      expect(exposure.get(language1)).toEqual((1 + 1 / 2 + 1 / 3 + 3 / 2 + 1 + 1 / 2 + 1 + 1 / 2) * 60 * 60);
      // 08:00-09:00 (50%) + 09:00-10:00 (33%) + 10:00-13:00 (50%)
      expect(exposure.get(language2)).toEqual(Math.round((1 / 2 + 1 / 3 + 3 / 2) * 60 * 60));
      // 09:00-10:00 (33%)
      expect(exposure.get(language3)).toEqual((1 / 3) * 60 * 60);
      // 14:00-15:00 (50%)
      expect(exposure.get(language4)).toEqual((1 / 2) * 60 * 60);
      // 16:00-17:00 (50%) + 17:00-19:00 (100%)
      expect(exposure.get(language5)).toEqual((1 / 2 + 2) * 60 * 60);
    });

    it("should get durations if there are gaps", () => {
      entry1.startedAt = "07:00:00";
      entry1.endedAt = "08:00:00";

      entry2.startedAt = "09:00:00";
      entry2.endedAt = "10:00:00";

      questionnaire.entries = new Collection(questionnaire, [entry1, entry2]);

      const exposure = service.getParticipantExposure(participant);

      expect(exposure.get(language1)).toEqual(60 * 60);
      expect(exposure.get(language2)).toEqual(60 * 60);
    });

    it("should consider ratio for multiple languages", () => {
      entryLanguage1.ratio = 60;
      entryLanguage2.ratio = 40;

      entry1.entryLanguages = new Collection(entry1, [entryLanguage1, entryLanguage2]);
      entry1.startedAt = "07:00:00";
      entry1.endedAt = "08:00:00";

      questionnaire.entries = new Collection(questionnaire, [entry1]);

      const exposure = service.getParticipantExposure(participant);

      expect(exposure.get(language1)).toEqual(0.6 * 60 * 60);
      expect(exposure.get(language2)).toEqual(0.4 * 60 * 60);
    });

    it("should consider weekly recurring", () => {
      entry1.weeklyRecurring = 1;
      entry2.weeklyRecurring = 2;

      entry1.startedAt = "08:00:00";
      entry2.startedAt = "08:00:00";
      entry1.endedAt = "09:00:00";
      entry2.endedAt = "09:00:00";

      questionnaire.entries = new Collection(questionnaire, [entry1, entry2]);

      const exposure = service.getParticipantExposure(participant);

      expect(exposure.get(language1)).toEqual((2 / 3) * 60 * 60);
      expect(exposure.get(language2)).toEqual((1 / 3) * 60 * 60);
    });
  });
});
