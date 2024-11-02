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

  findAll() {
    return this.questionnaireRepository.findAll();
  }

  findOne(id: number) {
    return this.questionnaireRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<Study>) {
    return this.questionnaireRepository.findOneOrFail(filter);
  }

  async update(id: number, questionnaireMutationDto: StudyMutationDto) {
    const questionnaire = await this.questionnaireRepository.findOneOrFail(id);
    questionnaire.assign(questionnaireMutationDto);

    await this.em.persist(questionnaire).flush();

    return questionnaire;
  }

  remove(id: number) {
    return this.em.remove(this.questionnaireRepository.getReference(id)).flush();
  }
}
