import { Module } from "@nestjs/common";
import { ParticipantsService } from "./services/participants.service";
import { ParticipantsController } from "./controllers/participants.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Participant } from "./entities/participant.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Participant])],
  providers: [ParticipantsService],
  controllers: [ParticipantsController],
})
export class ResearchModule {}
