import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { EntityManager, EntityRepository, FilterQuery, wrap } from "@mikro-orm/core";
import { bcrypt } from "hash-wasm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);

    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt({ password: createUserDto.password, salt, costFactor: 10 });

    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail(id);
  }

  findBy(filter: FilterQuery<User>) {
    return this.userRepository.findOneOrFail(filter);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail(id);

    if (updateUserDto.password) {
      const salt = new Uint8Array(16);
      crypto.getRandomValues(salt);
      updateUserDto.password = await bcrypt({ password: updateUserDto.password, salt, costFactor: 10 });
    }

    wrap(user).assign(updateUserDto);

    await this.em.persist(user).flush();

    return user;
  }

  remove(id: number) {
    return this.em.remove(this.userRepository.getReference(id)).flush();
  }
}
