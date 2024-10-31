import { Test, TestingModule } from "@nestjs/testing";
import { CarerController } from "./carer.controller";

describe("CarerController", () => {
  let controller: CarerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarerController],
    }).compile();

    controller = module.get<CarerController>(CarerController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
