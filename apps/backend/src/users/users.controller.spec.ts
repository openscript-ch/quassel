import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserCreationDto } from "./dto/user-creation.dto";

const createUserDto: UserCreationDto = {
  email: "hans@example.ch",
  password: "kanns-noch-immer",
};

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockImplementation((user: UserCreationDto) => Promise.resolve({ id: "3", ...user })),
            findAll: jest.fn().mockResolvedValue([
              {
                id: "1",
                email: "jessica@example.com",
                password: "$2a$10$dbae5sMC7oH0icr/rDto..iMqylCbkF5u6N4WyiUsO4v52cRpPnfW",
              },
              {
                id: "2",
                email: "aaron@example.com",
                password: "$2a$10$uupGsF.gs4iDGmnZbOzpN.OnM5p60Y3gmCMW17UEUwH.yaYZ/QSUK",
              },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                email: "jessica@example.com",
                password: "$2a$10$dbae5sMC7oH0icr/rDto..iMqylCbkF5u6N4WyiUsO4v52cRpPnfW",
                id,
              })
            ),
            update: jest.fn().mockImplementation((id: string, user: UserCreationDto) => {
              return Promise.resolve({ id, ...user });
            }),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create()", () => {
    it("should create a user", () => {
      expect(controller.create(createUserDto)).resolves.toEqual({
        id: "3",
        ...createUserDto,
      });
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });
});
