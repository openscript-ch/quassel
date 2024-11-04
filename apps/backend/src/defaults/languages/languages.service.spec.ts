import { Test, TestingModule } from "@nestjs/testing";
import { LanguagesService } from "./languages.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Language } from "./language.entity";
import { EntityManager } from "@mikro-orm/core";

describe("LanguagesService", () => {
  let service: LanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguagesService,
        {
          provide: getRepositoryToken(Language),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<LanguagesService>(LanguagesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
