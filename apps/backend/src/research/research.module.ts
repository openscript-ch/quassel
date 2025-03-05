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
import { Entry } from "./entries/entry.entity";
import { EntryLanguage } from "./entry-languages/entry-language.entity";
import { Questionnaire } from "./questionnaires/questionnaire.entity";
import { Study } from "./studies/study.entity";
import { StudyParticipantsController } from "./study-participants/study-participants.controller";
import { StudyParticipantsService } from "./study-participants/study-participants.service";

@Module({
  imports: [MikroOrmModule.forFeature([Entry, EntryLanguage, Participant, Questionnaire, Study])],
  providers: [ParticipantsService, EntriesService, EntryLanguagesService, QuestionnairesService, StudiesService, StudyParticipantsService],
  controllers: [
    ParticipantsController,
    EntriesController,
    QuestionnairesController,
    EntryLanguagesController,
    StudiesController,
    StudyParticipantsController,
  ],
})
export class ResearchModule {}
