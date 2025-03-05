import { Collection, EntityManager } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Participant } from "../../research/participants/participant.entity";
import { Entry } from "../../research/entries/entry.entity";
import { differenceInSeconds, parse } from "date-fns";
import { stringify } from "csv-stringify/sync";
import { Language } from "../../defaults/languages/language.entity";
import { entriesByInterval } from "@quassel/utils";

type LanguageExposure = Map<Language, number>;

@Injectable()
export class ReportsService {
  constructor(private readonly em: EntityManager) {}

  async evaluatedLanguageExposure(studyId: number) {
    const participants = await this.em.findAll(Participant, {
      where: { questionnaires: { participant: { studies: { id: studyId } } } },
      populate: [
        "questionnaires",
        "questionnaires.entries",
        "questionnaires.entries.entryLanguages",
        "questionnaires.entries.entryLanguages.language",
      ],
    });

    const columnKeys = new Set(["participant"]);

    const evaluatedExposurePerParticipant = participants.map((participant) => {
      const exposure = this.getParticipantExposure(participant);
      const sortedExposureEntries = Array.from(exposure).sort(([_a, exposureA], [_b, exposureB]) => exposureB - exposureA);
      const exposureSum = sortedExposureEntries.reduce((acc, [_, exposure]) => acc + exposure, 0);

      return sortedExposureEntries.reduce(
        (acc, [language, duration], index) => {
          acc[`L${index + 1}`] = duration / exposureSum;
          acc[`L${index + 1}_id`] = language.id;
          acc[`L${index + 1}_name`] = language.name;
          columnKeys
            .add(`L${index + 1}`)
            .add(`L${index + 1}_id`)
            .add(`L${index + 1}_name`);

          return acc;
        },
        { participant: participant.id }
      );
    });

    return stringify(evaluatedExposurePerParticipant, { header: true, columns: Array.from(columnKeys) });
  }

  getParticipantExposure(participant: Participant) {
    return participant.questionnaires.reduce<LanguageExposure>((acc, questionnaire) => {
      const entriesByWeekday = this.groupByWeekday(questionnaire.entries);

      entriesByWeekday.forEach((weekday) => {
        entriesByInterval(weekday).forEach((entriesInInterval, [start, end]) => {
          const duration = this.durationInSeconds(start, end);

          const intervalFractions = entriesInInterval.reduce((acc, entry) => acc + 1 / (entry.weeklyRecurring ?? 1), 0);

          entriesInInterval.forEach((entry) => {
            const supervisionRatio = 1 / (intervalFractions * (entry.weeklyRecurring ?? 1));

            entry.entryLanguages.map(({ language, ratio }) => {
              acc.set(language, (acc.get(language) ?? 0) + (ratio / 100) * duration * supervisionRatio * questionnaire.duration);
            });
          });
        });
      });

      return acc;
    }, new Map());
  }

  private durationInSeconds(start: string, end: string) {
    return differenceInSeconds(parse(end, "HH:mm:ss", new Date()), parse(start, "HH:mm:ss", new Date()));
  }

  private groupByWeekday(entries: Collection<Entry, object>) {
    return entries.reduce<Entry[][]>((acc, cur) => {
      acc[cur.weekday] = [...(acc[cur.weekday] ?? []), cur];
      return acc;
    }, []);
  }
}
