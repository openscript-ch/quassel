import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { EntryLanguage } from "./entry-language.entity";
import { EntryLanguageCreationDto, EntryLanguageMutationDto } from "./entry-language.dto";

@Injectable()
export class EntryLanguagesService {
  constructor(
    @InjectRepository(EntryLanguage)
    private readonly entryLanguageRepository: EntityRepository<EntryLanguage>,
    private readonly em: EntityManager
  ) {}

  async create(entryLanguageCreationDto: EntryLanguageCreationDto) {
    const entryLanguage = new EntryLanguage();
    entryLanguage.assign(entryLanguageCreationDto);

    try {
      await this.em.persist(entryLanguage).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("EntryLanguage with this name already exists");
      }
      throw e;
    }

    return entryLanguage.toObject();
  }

  findAll() {
    return this.entryLanguageRepository.findAll();
  }

  findOne(id: number) {
    return this.entryLanguageRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<EntryLanguage>) {
    return this.entryLanguageRepository.findOneOrFail(filter);
  }

  async update(id: number, entryLanguageMutationDto: EntryLanguageMutationDto) {
    const entryLanguage = await this.entryLanguageRepository.findOneOrFail(id);
    entryLanguage.assign(entryLanguageMutationDto);

    await this.em.persist(entryLanguage).flush();

    return entryLanguage;
  }

  remove(id: number) {
    return this.em.remove(this.entryLanguageRepository.getReference(id)).flush();
  }
}
