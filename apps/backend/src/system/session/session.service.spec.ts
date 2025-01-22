import { Test, TestingModule } from "@nestjs/testing";
import { SessionService } from "./session.service";
import { UsersService } from "../users/users.service";
import { ConfigService } from "../../config/config.service";

describe("SessionService", () => {
  let sessionService: SessionService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionService, { provide: UsersService, useValue: {} }, { provide: ConfigService, useValue: {} }],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    usersService = module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(sessionService).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
