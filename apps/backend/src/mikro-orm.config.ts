import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SeedManager } from "@mikro-orm/seeder";
import { configuration } from "./config/configuration";

const c = configuration();

export default defineConfig({
  entities: ["./dist/src/**/*.entity.js"],
  entitiesTs: ["./src/**/*.entity.ts"],
  host: c.database.host,
  port: c.database.port,
  dbName: c.database.name,
  user: c.database.user,
  password: c.database.password,
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
