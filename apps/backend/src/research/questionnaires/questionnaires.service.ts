import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery, QueryOrderMap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { QuestionnaireCreationDto, QuestionnaireMutationDto } from "./questionnaire.dto";
import { Questionnaire } from "./questionnaire.entity";
import { Entry } from "../entries/entry.entity";
import { EntryLanguage } from "../entry-languages/entry-language.entity";
import { addDays, isSameDay } from "date-fns";
import { SortOrder } from "../../common/dto/sort.dto";
import { Participant } from "../participants/participant.entity";
import { Study } from "../studies/study.entity";

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: EntityRepository<Questionnaire>,
    private readonly em: EntityManager
  ) {}

  async create(questionnaireCreationDto: QuestionnaireCreationDto, studyId?: number) {
    const questionnaire = new Questionnaire();
    questionnaire.assign(questionnaireCreationDto, { em: this.em });

    if (studyId) {
      const studyRef = this.em.getReference(Study, studyId);
      const participant = await this.em.findOneOrFail(Participant, { id: questionnaireCreationDto.participant }, { populate: ["studies"] });
      participant.studies.add(studyRef);
    }

    const prevQuestionnaire = await this.findLatestByParticipant(questionnaire.participant!.id);

    if (prevQuestionnaire && !prevQuestionnaire.completedAt)
      throw new BadRequestException("Complete the previous questionniare before starting a new one.");

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

  async findAll({
    sortBy,
    sortOrder,
    participantId,
    studyTitle,
  }: {
    sortBy?: keyof QueryOrderMap<Questionnaire>;
    sortOrder?: SortOrder;
    participantId?: number;
    studyTitle?: string;
  }) {
    return (
      await this.questionnaireRepository.findAll({
        where: { ...(participantId && { participant: participantId }), ...(studyTitle && { study: { title: { $fulltext: studyTitle } } }) },
        populate: ["participant"],
        orderBy: sortBy && { [sortBy]: sortOrder },
      })
    ).map((questionnaire) => questionnaire.toObject());
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

    const prevQuestionnaire = await this.questionnaireRepository.findOne(
      { participant: questionnaire.participant, endedAt: { $lt: questionnaire.startedAt } },
      { orderBy: { endedAt: "desc" } }
    );

    questionnaire.assign(questionnaireMutationDto);

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
