import { Test, TestingModule } from "@nestjs/testing";
import { QuestionnairesController } from "./questionnaires.controller";
import { QuestionnairesService } from "./questionnaires.service";

describe("QuestionnairesController", () => {
  let controller: QuestionnairesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionnairesController],
      providers: [
        {
          provide: QuestionnairesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<QuestionnairesController>(QuestionnairesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
