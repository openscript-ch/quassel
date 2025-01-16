import { EntityRepository, EntityManager, UniqueConstraintViolationException, FilterQuery } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
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
    language.assign(languageCreationDto, { em: this.em });

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

  async findAll(participantId?: number) {
    return (
      await this.languageRepository.findAll({
        where: participantId ? { $or: [{ participant: null }, { participant: participantId }] } : { participant: null },
        populate: ["entryLanguagesCount"],
        orderBy: { entryLanguagesCount: "desc" },
      })
    ).map((language) => language.toObject());
  }

  async findOne(id: number) {
    return (await this.languageRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<Language>) {
    return (await this.languageRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, languageMutationDto: LanguageMutationDto) {
    const language = await this.languageRepository.findOneOrFail(id);
    language.assign(languageMutationDto);

    await this.em.persist(language).flush();

    return language.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.languageRepository.getReference(id)).flush();
  }
}
