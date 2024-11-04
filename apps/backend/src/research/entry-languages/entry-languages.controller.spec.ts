import { Test, TestingModule } from "@nestjs/testing";
import { EntryLanguagesController } from "./entry-languages.controller";
import { EntryLanguagesService } from "./entry-languages.service";

describe("EntryLanguagesController", () => {
  let controller: EntryLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryLanguagesController],
      providers: [
        {
          provide: EntryLanguagesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<EntryLanguagesController>(EntryLanguagesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
