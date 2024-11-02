import { Test, TestingModule } from "@nestjs/testing";
import { EntryLanguagesController } from "./entry-languages.controller";

describe("EntryLanguagesController", () => {
  let controller: EntryLanguagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntryLanguagesController],
    }).compile();

    controller = module.get<EntryLanguagesController>(EntryLanguagesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
