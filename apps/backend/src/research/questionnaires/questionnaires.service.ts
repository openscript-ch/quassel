import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { QuestionnaireCreationDto, QuestionnaireMutationDto } from "./questionnaire.dto";
import { Questionnaire } from "./questionnaire.entity";

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

  async update(id: number, questionnaireMutationDto: QuestionnaireMutationDto) {
    const questionnaire = await this.questionnaireRepository.findOneOrFail(id, {
      populate: ["entries", "entries.carer", "entries.entryLanguages.language", "participant"],
    });
    questionnaire.assign(questionnaireMutationDto);

    await this.em.persist(questionnaire).flush();

    return questionnaire.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.questionnaireRepository.getReference(id)).flush();
  }
}
