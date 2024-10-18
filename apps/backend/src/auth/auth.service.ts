import { EntityRepository } from "@mikro-orm/core";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/entities/user.entity";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@mikro-orm/nestjs";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail({ email });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException("Password does not match");
    }

    return user;
  }
  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return this.jwtService.sign(payload);
  }
}
