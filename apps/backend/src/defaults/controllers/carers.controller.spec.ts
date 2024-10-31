import { Test, TestingModule } from "@nestjs/testing";
import { CarersController } from "./carers.controller";

describe("CarersController", () => {
  let controller: CarersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarersController],
    }).compile();

    controller = module.get<CarersController>(CarersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
