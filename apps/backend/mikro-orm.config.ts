import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { configuration } from "./src/config/configuration";
import { SeedManager } from "@mikro-orm/seeder";

export default defineConfig({
  entities: ["./dist/src/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  host: configuration().database.host,
  port: configuration().database.port,
  dbName: configuration().database.name,
  user: configuration().database.user,
  password: configuration().database.password,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
  migrations: {
    pathTs: "./db/migrations",
  },
  seeder: {
    pathTs: "./db/seeds",
  },
});
