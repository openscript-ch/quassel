import { Test, TestingModule } from "@nestjs/testing";
import { EntriesService } from "./entries.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Entry } from "./entry.entity";
import { EntityManager } from "@mikro-orm/core";

describe("EntriesService", () => {
  let service: EntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        {
          provide: getRepositoryToken(Entry),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
