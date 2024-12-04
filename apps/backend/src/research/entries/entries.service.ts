import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { EntryCreationDto, EntryMutationDto } from "./entry.dto";
import { Entry } from "./entry.entity";

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: EntityRepository<Entry>,
    private readonly em: EntityManager
  ) {}

  async create(entryCreationDto: EntryCreationDto) {
    const entry = new Entry();
    entry.assign(entryCreationDto, { em: this.em });

    try {
      await this.em.persist(entry).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Entry with this name already exists");
      }
      throw e;
    }

    return (await entry.populate(["entryLanguages"])).toObject();
  }

  async findAll() {
    return (await this.entryRepository.findAll({ populate: ["entryLanguages"] })).map((entry) => entry.toObject());
  }

  async findOne(id: number) {
    return (await this.entryRepository.findOneOrFail(id, { populate: ["entryLanguages"] })).toObject();
  }

  async findBy(filter: FilterQuery<Entry>) {
    return (await this.entryRepository.findOneOrFail(filter, { populate: ["entryLanguages"] })).toObject();
  }

  async update(id: number, entryMutationDto: EntryMutationDto) {
    const entry = await this.entryRepository.findOneOrFail(id, { populate: ["entryLanguages"] });

    entry.assign(entryMutationDto);

    await this.em.persist(entry).flush();

    return entry.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.entryRepository.getReference(id)).flush();
  }
}
