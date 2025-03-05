import { Test, TestingModule } from "@nestjs/testing";
import { StudyParticipantsService } from "./study-participants.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Study } from "../studies/study.entity";
import { EntityManager } from "@mikro-orm/core";

describe("StudyParticpantsService", () => {
  let service: StudyParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudyParticipantsService,
        {
          provide: getRepositoryToken(Study),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StudyParticipantsService>(StudyParticipantsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
