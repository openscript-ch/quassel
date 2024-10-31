import { Module } from "@nestjs/common";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { ConfigModule } from "./config/config.module";
import { UsersModule } from "./users/users.module";
import { DefaultsModule } from "./defaults/defaults.module";

@Module({
  imports: [MikroOrmModule.forRoot(), ConfigModule, UsersModule, DefaultsModule],
})
export class AppModule {}
