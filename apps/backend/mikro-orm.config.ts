import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";

export default defineConfig({
  entities: ["./dist/src/entities"],
  entitiesTs: ["./src/entities"],
  host: "db",
  dbName: "postgres",
  password: "postgres",
  user: "postgres",
  driver: PostgreSqlDriver,
  metadataProvider: TsMorphMetadataProvider,
  extensions: [Migrator],
  migrations: {
    pathTs: "./migrations",
  },
});
