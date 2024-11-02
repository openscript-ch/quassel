import type { EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { User, UserRole } from "../../src/system/users/user.entity";
import { getPasswordHash } from "../../src/common/utils/encrypt";
import { Participant } from "../../src/research/entities/participant.entity";
import { Carer } from "../../src/defaults/carers/carer.entity";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager) {
    const users = [
      {
        role: UserRole.ADMIN,
        email: "admin@example.com",
        password: await getPasswordHash("quassel*1234"),
      },
      {
        role: UserRole.ASSISTANT,
        email: "assistant@example.com",
        password: await getPasswordHash("quassel*1234"),
      },
    ];

    const participants = [
      {
        id: 1000,
        birthday: new Date("2023-03-01"),
      },
      {
        id: 2000,
        birthday: new Date("2024-06-01"),
      },
      {
        id: 3000,
        birthday: new Date("2024-09-01"),
      },
    ];

    const carers = [
      { name: "Grossmutter" },
      { name: "Grossvater" },
      { name: "Mutter" },
      { name: "Vater" },
      { name: "Tante" },
      { name: "Onkel" },
    ];

    em.persist([
      ...users.map((user) => em.create(User, user)),
      ...participants.map((participant) => em.create(Participant, participant)),
      ...carers.map((carer) => em.create(Carer, carer)),
    ]);

    await em.flush();
  }
}
