import { Module } from "@nestjs/common";
import { ParticipantsService } from "./participants/participants.service";
import { ParticipantsController } from "./participants/participants.controller";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Participant } from "./participants/participant.entity";

@Module({
  imports: [MikroOrmModule.forFeature([Participant])],
  providers: [ParticipantsService],
  controllers: [ParticipantsController],
})
export class ResearchModule {}
