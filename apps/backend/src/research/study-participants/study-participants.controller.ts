import { Body, Controller, Delete, Post } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";
import { Serialize } from "../../common/decorators/serialize";
import { StudyParticipantMutationDto, StudyParticipantResponseDto } from "./study-participants.dto";
import { StudyParticipantsService } from "./study-participants.service";

@Controller("study-participants")
export class StudyParticipantsController {
  constructor(private readonly studyParticipantsService: StudyParticipantsService) {}

  @Post()
  @ApiOperation({ summary: "Create a study participant association" })
  @Serialize(StudyParticipantResponseDto)
  create(@Body() study: StudyParticipantMutationDto): Promise<StudyParticipantResponseDto> {
    return this.studyParticipantsService.create(study);
  }

  @Delete()
  @ApiOperation({ summary: "Delete a study participant association" })
  @Serialize(StudyParticipantResponseDto)
  delete(@Body() study: StudyParticipantMutationDto): Promise<StudyParticipantResponseDto> {
    return this.studyParticipantsService.delete(study);
  }
}
