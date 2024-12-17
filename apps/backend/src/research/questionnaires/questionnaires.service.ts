import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { QuestionnaireCreationDto, QuestionnaireMutationDto } from "./questionnaire.dto";
import { Questionnaire } from "./questionnaire.entity";
import { Entry } from "../entries/entry.entity";
import { EntryLanguage } from "../entry-languages/entry-language.entity";
import { addDays, isSameDay } from "date-fns";

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: EntityRepository<Questionnaire>,
    private readonly em: EntityManager
  ) {}

  async create(questionnaireCreationDto: QuestionnaireCreationDto) {
    const questionnaire = new Questionnaire();
    questionnaire.assign(questionnaireCreationDto, { em: this.em });

    const prevQuestionnaire = await this.findLatestByParticipant(questionnaire.participant!.id);
    this.validateStartDate(questionnaire, prevQuestionnaire);

    await prevQuestionnaire?.populate(["entries.entryLanguages"]);

    const clonedEntries = prevQuestionnaire?.entries.map((entry) => {
      const { id: _id, entryLanguages: _entryLanguages, questionnaire: _questionnaire, ...rest } = entry.toPOJO();
      const newEntry = this.em.create(Entry, { ...rest, questionnaire });

      entry.entryLanguages.map((entryLanguage) => {
        const { id: _id, entry: _entry, ...rest } = entryLanguage.toPOJO();
        return this.em.create(EntryLanguage, { ...rest, entry: newEntry });
      });

      return newEntry;
    });

    questionnaire.assign({ entries: clonedEntries ?? [] });

    try {
      await this.em.persist(questionnaire).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Questionnaire with this name already exists");
      }
      throw e;
    }

    return (await questionnaire.populate(["entries", "entries.carer", "entries.entryLanguages.language", "participant"])).toObject();
  }

  async findAll() {
    return (await this.questionnaireRepository.findAll()).map((questionnaire) => questionnaire.toObject());
  }

  async findOne(id: number) {
    return (
      await this.questionnaireRepository.findOneOrFail(id, {
        populate: ["entries", "entries.carer", "entries.entryLanguages.language", "participant"],
      })
    ).toObject();
  }

  async findBy(filter: FilterQuery<Questionnaire>) {
    return (await this.questionnaireRepository.findOneOrFail(filter)).toObject();
  }

  async findLatestByParticipant(participantId: number) {
    return this.questionnaireRepository.findOne({ participant: participantId }, { orderBy: { endedAt: "desc" } });
  }

  async update(id: number, questionnaireMutationDto: QuestionnaireMutationDto) {
    const questionnaire = await this.questionnaireRepository.findOneOrFail(id, {
      populate: ["entries", "entries.carer", "entries.entryLanguages.language", "participant"],
    });
    questionnaire.assign(questionnaireMutationDto);

    const prevQuestionnaire = await this.findLatestByParticipant(questionnaire.participant!.id);
    if (prevQuestionnaire?.id !== id) {
      this.validateStartDate(questionnaire, prevQuestionnaire);
    }

    await this.em.persist(questionnaire).flush();

    return questionnaire.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.questionnaireRepository.getReference(id)).flush();
  }

  private validateStartDate(questionnaire: Questionnaire, prevQuestionnaire: Questionnaire | null) {
    if (prevQuestionnaire && !isSameDay(addDays(prevQuestionnaire.endedAt!, 1), questionnaire.startedAt!)) {
      throw new UnprocessableEntityException("Start of the new questionnaire must match with the end of the previous");
    }
  }
}
