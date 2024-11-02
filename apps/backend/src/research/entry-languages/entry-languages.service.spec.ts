import { Test, TestingModule } from "@nestjs/testing";
import { EntryLanguagesService } from "./entry-languages.service";

describe("EntryLanguagesService", () => {
  let service: EntryLanguagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntryLanguagesService],
    }).compile();

    service = module.get<EntryLanguagesService>(EntryLanguagesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
