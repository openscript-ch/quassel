import { Test, TestingModule } from "@nestjs/testing";
import { StudiesService } from "./studies.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Study } from "./study.entity";
import { EntityManager } from "@mikro-orm/core";

describe("StudiesService", () => {
  let service: StudiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudiesService,
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

    service = module.get<StudiesService>(StudiesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
