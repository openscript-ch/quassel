import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { StudyCreationDto, StudyMutationDto } from "./study.dto";
import { Study } from "./study.entity";

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private readonly questionnaireRepository: EntityRepository<Study>,
    private readonly em: EntityManager
  ) {}

  async create(questionnaireCreationDto: StudyCreationDto) {
    const questionnaire = new Study();
    questionnaire.assign(questionnaireCreationDto);

    try {
      await this.em.persist(questionnaire).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Study with this name already exists");
      }
      throw e;
    }

    return questionnaire.toObject();
  }

  async findAll() {
    return (await this.questionnaireRepository.findAll()).map((questionnaire) => questionnaire.toObject());
  }

  async findOne(id: number) {
    return (await this.questionnaireRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<Study>) {
    return (await this.questionnaireRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, questionnaireMutationDto: StudyMutationDto) {
    const questionnaire = await this.questionnaireRepository.findOneOrFail(id);
    questionnaire.assign(questionnaireMutationDto);

    await this.em.persist(questionnaire).flush();

    return questionnaire.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.questionnaireRepository.getReference(id)).flush();
  }
}
