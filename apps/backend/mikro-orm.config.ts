import { defineConfig, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";

export default defineConfig({
  entities: ["./dist/src/entities"],
  entitiesTs: ["./src/entities"],
  dbName: "postgres",
  driver: PostgreSqlDriver,
  extensions: [Migrator],
  migrations: {
    pathTs: "./migrations",
  },
});
