import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException } from "@mikro-orm/core";
import { ParticipantCreationDto, ParticipantMutationDto } from "./participant.dto";
import { Participant } from "./participant.entity";

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: EntityRepository<Participant>,
    private readonly em: EntityManager
  ) {}

  async create(participantCreationDto: ParticipantCreationDto) {
    const participant = new Participant();
    participant.birthday = participantCreationDto.birthday;

    try {
      await this.em.persist(participant).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Participant with this id already exists");
      }
      throw e;
    }

    return participant.toObject();
  }

  async findAll() {
    return (await this.participantRepository.findAll()).map((participant) => participant.toObject());
  }

  async findOne(id: number) {
    return (await this.participantRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<Participant>) {
    return (await this.participantRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, participantMutationDto: ParticipantMutationDto) {
    const participant = await this.participantRepository.findOneOrFail(id);
    participant.assign(participantMutationDto);

    await this.em.persist(participant).flush();

    return participant.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.participantRepository.getReference(id)).flush();
  }
}
