import { Test, TestingModule } from "@nestjs/testing";
import { CarersService } from "./carers.service";

describe("CarersService", () => {
  let service: CarersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarersService],
    }).compile();

    service = module.get<CarersService>(CarersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
