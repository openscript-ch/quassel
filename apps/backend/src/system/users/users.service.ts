import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@mikro-orm/nestjs";
import { User } from "./user.entity";
import { EntityManager, EntityRepository, FilterQuery, UniqueConstraintViolationException } from "@mikro-orm/core";
import { getPasswordHash } from "../../common/utils/encrypt";
import { UserCreationDto, UserMutationDto } from "./user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager
  ) {}

  async create(userCreationDto: UserCreationDto) {
    const user = new User();
    user.assign(userCreationDto);
    user.password = await getPasswordHash(userCreationDto.password);

    try {
      await this.em.persist(user).flush();
    } catch (e) {
      if (e instanceof UniqueConstraintViolationException) {
        throw new UnprocessableEntityException("User with this email already exists");
      }
      throw e;
    }

    return user.toObject();
  }

  async findAll() {
    return (await this.userRepository.findAll()).map((user) => user.toObject());
  }

  async findOne(id: number) {
    return (await this.userRepository.findOneOrFail(id)).toObject();
  }

  async findBy(filter: FilterQuery<User>) {
    return (await this.userRepository.findOneOrFail(filter)).toObject();
  }

  async update(id: number, userMutationDto: UserMutationDto) {
    const user = await this.userRepository.findOneOrFail(id);

    if (userMutationDto.password) {
      userMutationDto.password = await getPasswordHash(userMutationDto.password);
    }

    user.assign(userMutationDto);

    await this.em.persist(user).flush();

    return user.toObject();
  }

  remove(id: number) {
    return this.em.remove(this.userRepository.getReference(id)).flush();
  }
}
