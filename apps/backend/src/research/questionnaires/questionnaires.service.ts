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
    questionnaire.assign(questionnaireCreationDto);

    try {
      await this.em.persist(questionnaire).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Questionnaire with this name already exists");
      }
      throw e;
    }

    return questionnaire.toObject();
  }

  findAll() {
    return this.questionnaireRepository.findAll();
  }

  findOne(id: number) {
    return this.questionnaireRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<Questionnaire>) {
    return this.questionnaireRepository.findOneOrFail(filter);
  }

  async update(id: number, questionnaireMutationDto: QuestionnaireMutationDto) {
    const questionnaire = await this.questionnaireRepository.findOneOrFail(id);
    questionnaire.assign(questionnaireMutationDto);

    await this.em.persist(questionnaire).flush();

    return questionnaire;
  }

  remove(id: number) {
    return this.em.remove(this.questionnaireRepository.getReference(id)).flush();
  }
}
