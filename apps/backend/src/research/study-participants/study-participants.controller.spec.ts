import { Test, TestingModule } from "@nestjs/testing";
import { StudyParticipantsController } from "./study-participants.controller";

describe("StudyParticipantsController", () => {
  let controller: StudyParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyParticipantsController],
    }).compile();

    controller = module.get<StudyParticipantsController>(StudyParticipantsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
