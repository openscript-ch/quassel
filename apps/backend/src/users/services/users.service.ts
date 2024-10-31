import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UserCreationDto } from "../dto/user-creation.dto";
import { UserMutationDto } from "../dto/user-mutation.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "../entities/user.entity";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException, wrap } from "@mikro-orm/core";
import { getPasswordHash } from "../../common/utils/encrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  async create(userCreationDto: UserCreationDto) {
    const user = new User();
    user.email = userCreationDto.email;
    user.role = userCreationDto.role;
    user.password = await getPasswordHash(userCreationDto.password);

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

  async update(id: number, userMutationDto: UserMutationDto) {
    const user = await this.userRepository.findOneOrFail(id);

    if (userMutationDto.password) {
      userMutationDto.password = await getPasswordHash(userMutationDto.password);
    }

    wrap(user).assign(userMutationDto);

    await this.em.persist(user).flush();

    return user;
  }

  remove(id: number) {
    return this.em.remove(this.userRepository.getReference(id)).flush();
  }
}
