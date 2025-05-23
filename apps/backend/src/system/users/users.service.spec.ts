import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { getRepositoryToken } from "@mikro-orm/nestjs";
import { User } from "./user.entity";
import { EntityManager } from "@mikro-orm/core";
import { MikroORM } from "@mikro-orm/postgresql";

const userArray = [
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
];
const firstUser = userArray[0];
MikroORM.initSync({ dbName: ":memory:", entities: [User] });

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOneBy: jest.fn().mockResolvedValue(firstUser),
          },
        },
        {
          provide: EntityManager,
          useValue: {
            remove: jest.fn(),
            persistAndFlush: jest.fn().mockImplementation(async (user: User) => {
              user.id = 3;
              return user;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create()", () => {
    it("should successfully insert a user", async () => {
      const user = await service.create({
        email: "hans@example.com",
        password: "kanns-noch-immer",
      });

      expect(user.id).toBe(3);
      expect(user.email).toBe("hans@example.com");
    });
  });
});
