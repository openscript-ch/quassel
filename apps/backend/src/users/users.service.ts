import { ClassSerializerInterceptor, Injectable, UnprocessableEntityException, UseInterceptors } from "@nestjs/common";
import { UserCreationDto } from "./dto/user-creation.dto";
import { UserMutationDto } from "./dto/user-mutation.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "./entities/user.entity";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException, wrap } from "@mikro-orm/core";
import { bcrypt } from "hash-wasm";

@UseInterceptors(ClassSerializerInterceptor)
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  async create(userCreationDto: UserCreationDto) {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);

    const user = new User();
    user.email = userCreationDto.email;
    user.role = userCreationDto.role;
    user.password = await bcrypt({ password: userCreationDto.password, salt, costFactor: 10 });

    try {
      await this.em.persist(user).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("User with this email already exists");
      }
      throw e;
    }

    return user;
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

  async update(id: number, updateUserDto: UserMutationDto) {
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
