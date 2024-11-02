import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { wrap } from "module";
import { LanguageCreationDto, LanguageMutationDto } from "./language.dto";
import { Language } from "./language.entity";

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: EntityRepository<Language>,
    private readonly em: EntityManager
  ) {}

  async create(languageCreationDto: LanguageCreationDto) {
    const language = new Language();
    language.name = languageCreationDto.name;

    try {
      await this.em.persist(language).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("Language with this name already exists");
      }
      throw e;
    }

    return language.toObject();
  }

  findAll() {
    return this.languageRepository.findAll();
  }

  findOne(id: number) {
    return this.languageRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<Language>) {
    return this.languageRepository.findOneOrFail(filter);
  }

  async update(id: number, languageMutationDto: LanguageMutationDto) {
    const language = await this.languageRepository.findOneOrFail(id);

    wrap(language).assign(languageMutationDto);

    await this.em.persist(language).flush();

    return language;
  }

  remove(id: number) {
    return this.em.remove(this.languageRepository.getReference(id)).flush();
  }
}
