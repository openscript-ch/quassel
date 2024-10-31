import { Test, TestingModule } from "@nestjs/testing";
import { CarerService } from "./carer.service";

describe("CarerService", () => {
  let service: CarerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarerService],
    }).compile();

    service = module.get<CarerService>(CarerService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
