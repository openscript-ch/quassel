import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ConfigModule } from "./config/config.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [MikroOrmModule.forRoot(), ConfigModule, UsersModule],
})
export class AppModule {}
