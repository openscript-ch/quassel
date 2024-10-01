import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { User } from "src/entities/user.entity";

@Controller("/users")
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly entityManager: EntityManager
  ) {}

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  @Get()
  async findMany(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Post()
  async create(@Body() userInput: Omit<User, "id">): Promise<User> {
    const user = this.userRepository.create(userInput);
    await this.entityManager.flush();

    return user;
  }

  @Delete(":id")
  async delete(@Param("id") id: number): Promise<number> {
    return this.userRepository.nativeDelete({ id });
  }
}
