import { Injectable } from "@nestjs/common";
import { StudyParticipantMutationDto } from "./study-participants.dto";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Study } from "../studies/study.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { Participant } from "../participants/participant.entity";

@Injectable()
export class StudyParticipantsService {
  constructor(
    @InjectRepository(Study)
    private readonly studyRepository: EntityRepository<Study>,
    private readonly em: EntityManager
  ) {}
  async create(studyParticipant: StudyParticipantMutationDto) {
    const participantRef = this.em.getReference(Participant, studyParticipant.participantId);
    const study = await this.studyRepository.findOneOrFail(studyParticipant.studyId);
    study.participants.add(participantRef);

    await this.em.flush();

    return studyParticipant;
  }
}
