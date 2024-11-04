import { Test, TestingModule } from "@nestjs/testing";
import { CarersService } from "./carers.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { Carer } from "./carer.entity";
import { EntityManager } from "@mikro-orm/core";

describe("CarersService", () => {
  let service: CarersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarersService,
        {
          provide: getRepositoryToken(Carer),
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CarersService>(CarersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
