import { Test, TestingModule } from "@nestjs/testing";
import { CarersController } from "../carers/carers.controller";
import { CarersService } from "./carers.service";

describe("CarersController", () => {
  let controller: CarersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarersController],
      providers: [
        {
          provide: CarersService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CarersController>(CarersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
