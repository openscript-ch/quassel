import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants/participants.service";
import { ParticipantsController } from "./participants/participants.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Participant } from "./participants/participant.entity";
import { EntriesController } from "./entries/entries.controller";
import { EntriesService } from "./entries/entries.service";
import { EntryLanguagesService } from "./entry-languages/entry-languages.service";
import { QuestionnairesService } from "./questionnaires/questionnaires.service";
import { QuestionnairesController } from "./questionnaires/questionnaires.controller";
import { EntryLanguagesController } from "./entry-languages/entry-languages.controller";
import { StudiesController } from "./studies/studies.controller";
import { StudiesService } from "./studies/studies.service";

@Module({
  imports: [MikroOrmModule.forFeature([Participant])],
  providers: [ParticipantsService, EntriesService, EntryLanguagesService, QuestionnairesService, StudiesService],
  controllers: [ParticipantsController, EntriesController, QuestionnairesController, EntryLanguagesController, StudiesController],
})
export class ResearchModule {}
