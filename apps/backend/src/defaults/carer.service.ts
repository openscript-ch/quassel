import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Carer } from "./entities/carer.entity";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException, wrap } from "@mikro-orm/core";
import { CarerCreationDto } from "./dto/carer-creation.dto";
import { CarerMutationDto } from "./dto/carer-mutation.dto";

@Injectable()
export class CarerService {
  constructor(
    @InjectRepository(Carer)
    private readonly carerRepository: EntityRepository<Carer>,
    private readonly em: EntityManager
  ) {}

  async create(carerCreationDto: CarerCreationDto) {
    const carer = new Carer();
    carer.name = carerCreationDto.name;

    try {
      await this.em.persist(carer).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Carer with this name already exists");
      }
      throw e;
    }

    return carer;
  }

  findAll() {
    return this.carerRepository.findAll();
  }

  findOne(id: number) {
    return this.carerRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<Carer>) {
    return this.carerRepository.findOneOrFail(filter);
  }

  async update(id: number, carerMutationDto: CarerMutationDto) {
    const carer = await this.carerRepository.findOneOrFail(id);

    wrap(carer).assign(carerMutationDto);

    await this.em.persist(carer).flush();

    return carer;
  }

  remove(id: number) {
    return this.em.remove(this.carerRepository.getReference(id)).flush();
  }
}
