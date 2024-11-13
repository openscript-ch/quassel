import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { StudyCreationDto, StudyMutationDto } from "./study.dto";
import { Study } from "./study.entity";

@Injectable()
export class StudiesService {
  constructor(
    @InjectRepository(Study)
    private readonly studyRepository: EntityRepository<Study>,
    private readonly em: EntityManager
  ) {}

  async create(studyCreationDto: StudyCreationDto) {
    const study = new Study();
    study.assign(studyCreationDto);

    try {
      await this.em.persist(study).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Study with this name already exists");
      }
      throw e;
    }

    return study.toObject();
  }

  async findAll() {
    return (await this.studyRepository.findAll()).map((study) => study.toObject());
  }

  async findOne(id: number) {
    return (await this.studyRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<Study>) {
    return (await this.studyRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, studyMutationDto: StudyMutationDto) {
    const study = await this.studyRepository.findOneOrFail(id);
    study.assign(studyMutationDto);

    await this.em.persist(study).flush();

    return study.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.studyRepository.getReference(id)).flush();
  }
}
