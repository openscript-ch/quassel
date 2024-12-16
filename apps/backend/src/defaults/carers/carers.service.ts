import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Carer } from "./carer.entity";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException } from "@mikro-orm/core";
import { CarerCreationDto, CarerMutationDto } from "./carer.dto";

@Injectable()
export class CarersService {
  constructor(
    @InjectRepository(Carer)
    private readonly carerRepository: EntityRepository<Carer>,
    private readonly em: EntityManager
  ) {}

  async create(carerCreationDto: CarerCreationDto) {
    const carer = new Carer();
    carer.assign(carerCreationDto, { em: this.em });

    try {
      await this.em.persist(carer).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Carer with this name already exists");
      }
      throw e;
    }

    return carer.toObject();
  }

  async findAll(participantId?: number) {
    return (
      await this.carerRepository.findAll({
        where: participantId ? { $or: [{ participant: null }, { participant: participantId }] } : { participant: null },
      })
    ).map((carer) => carer.toObject());
  }

  async findOne(id: number) {
    return (await this.carerRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<Carer>) {
    return (await this.carerRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, carerMutationDto: CarerMutationDto) {
    const carer = await this.carerRepository.findOneOrFail(id);
    carer.assign(carerMutationDto);

    await this.em.persist(carer).flush();

    return carer.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.carerRepository.getReference(id)).flush();
  }
}
