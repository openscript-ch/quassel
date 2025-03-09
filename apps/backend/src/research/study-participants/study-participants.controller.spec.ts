import { Test, TestingModule } from "@nestjs/testing";
import { StudyParticipantsController } from "./study-participants.controller";
import { StudyParticipantsService } from "./study-participants.service";

describe("StudyParticipantsController", () => {
  let controller: StudyParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyParticipantsController],
      providers: [
        {
          provide: StudyParticipantsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<StudyParticipantsController>(StudyParticipantsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
