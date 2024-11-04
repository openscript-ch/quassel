import { Test, TestingModule } from "@nestjs/testing";
import { ParticipantsService } from "./participants.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Participant } from "./participant.entity";
import { EntityManager } from "@mikro-orm/core";

describe("ParticipantsService", () => {
  let service: ParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ParticipantsService,
        {
          provide: getRepositoryToken(Participant),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ParticipantsService>(ParticipantsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
