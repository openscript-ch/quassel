import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { configuration } from "src/config/configuration";

export default defineConfig({
  entities: ["./dist/src/entities"],
  entitiesTs: ["./src/entities"],
  host: configuration().database.host,
  port: configuration().database.port,
  dbName: configuration().database.name,
  user: configuration().database.user,
  password: configuration().database.password,
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    pathTs: "./migrations",
  },
});
