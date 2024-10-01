import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { User } from "src/entities/user.entity";

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  controllers: [UserController],
})
export class UserModule {}
