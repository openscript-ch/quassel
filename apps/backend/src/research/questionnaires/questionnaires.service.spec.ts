import { Test, TestingModule } from "@nestjs/testing";
import { QuestionnairesService } from "./questionnaires.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Questionnaire } from "./questionnaire.entity";
import { EntityManager } from "@mikro-orm/core";

describe("QuestionnairesService", () => {
  let service: QuestionnairesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionnairesService,
        {
          provide: getRepositoryToken(Questionnaire),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<QuestionnairesService>(QuestionnairesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
