import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../../src/users/entities/user.entity";
import { bcrypt } from "hash-wasm";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    em.create(User, {
      role: UserRole.ADMIN,
      email: "administrator@example.ch",
      password: await bcrypt({ password: "quassel*1234", salt, costFactor: 10 }),
    });
  }
}
