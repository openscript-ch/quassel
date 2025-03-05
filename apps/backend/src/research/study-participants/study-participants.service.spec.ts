import { Test, TestingModule } from "@nestjs/testing";
import { StudyParticipantsService } from "./study-participants.service";

describe("StudyParticipantsService", () => {
  let service: StudyParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyParticipantsService],
    }).compile();

    service = module.get<StudyParticipantsService>(StudyParticipantsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
