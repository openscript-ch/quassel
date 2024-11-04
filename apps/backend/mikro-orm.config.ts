import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SeedManager } from "@mikro-orm/seeder";
import { configuration } from "./src/config/configuration";

const c = configuration();

export default defineConfig({
  entities: ["./**/*.entity.js"],
  entitiesTs: ["./**/*.entity.ts"],
  host: c.database.host,
  port: c.database.port,
  dbName: c.database.name,
  user: c.database.user,
  password: c.database.password,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator, SeedManager],
  migrations: {
    path: "./db/migrations",
    pathTs: "./db/migrations",
  },
  seeder: {
    path: "./db/seeds",
    pathTs: "./db/seeds",
  },
});
