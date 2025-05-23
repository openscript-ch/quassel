import { EntityRepository, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { EntryCreationDto, EntryUpdateDto } from "./entry.dto";
import { Entry } from "./entry.entity";
import { EntityManager, raw } from "@mikro-orm/postgresql";

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: EntityRepository<Entry>,
    private readonly em: EntityManager
  ) {}

  async create({ weekday, ...rest }: EntryCreationDto) {
    const entries = weekday.map((w) => {
      const entry = new Entry();
      entry.assign({ ...rest, weekday: w }, { em: this.em });

      this.em.persist(entry);
      return entry;
    });

    await this.em.flush();

    return entries.map((entries) => entries.toObject().id);
  }

  async findAll() {
    return (await this.entryRepository.findAll({ populate: ["entryLanguages"] })).map((entry) => entry.toObject());
  }

  async findOne(id: number) {
    return (await this.entryRepository.findOneOrFail(id, { populate: ["entryLanguages"] })).toObject();
  }

  async findBy(filter: FilterQuery<Entry>) {
    return (await this.entryRepository.findOneOrFail(filter, { populate: ["entryLanguages"] })).toObject();
  }

  async findTemplatesForParticipant(participantId: number) {
    const uniqueEntryGroups = this.em
      .createQueryBuilder(Entry, "e")
      .select(["e.id"])
      .distinctOn(raw("array_agg(ARRAY[el.language_id, el.ratio, e.carer_id] ORDER BY el.language_id)"))
      .join("e.entryLanguages", "el")
      .join("e.questionnaire", "q")
      .where({ "q.participant": participantId })
      .groupBy("e.id");

    const populatedUniqueEntries = await this.em
      .createQueryBuilder(Entry, "e")
      .select("*")
      .joinAndSelect("e.entryLanguages", "el")
      .joinAndSelect("e.carer", "c")
      .joinAndSelect("el.language", "l")
      .where({ id: { $in: uniqueEntryGroups.getKnexQuery() } })
      .getResultList();

    return populatedUniqueEntries.map((entry) => {
      const { entryLanguages, carer } = entry.toObject();
      return { entryLanguages, carer: { ...carer } };
    });
  }

  async update(id: number, entryMutationDto: EntryUpdateDto) {
    const entry = await this.entryRepository.findOneOrFail(id, { populate: ["entryLanguages"] });

    entry.assign(entryMutationDto);

    await this.em.persist(entry).flush();

    return entry.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.entryRepository.getReference(id)).flush();
  }

  removeAllFromQuestionnaire(questionnaireId: number) {
    return this.entryRepository.nativeDelete({ questionnaire: questionnaireId });
  }
}
