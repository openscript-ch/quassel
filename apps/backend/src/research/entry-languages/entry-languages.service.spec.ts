import { Test, TestingModule } from "@nestjs/testing";
import { EntryLanguagesService } from "./entry-languages.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { EntryLanguage } from "./entry-language.entity";
import { EntityManager } from "@mikro-orm/core";

describe("EntryLanguagesService", () => {
  let service: EntryLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntryLanguagesService,
        {
          provide: getRepositoryToken(EntryLanguage),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EntryLanguagesService>(EntryLanguagesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
