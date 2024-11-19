import { components } from "../api.gen";
import { map } from "nanostores";

type Questionnaire = {
  participant: components["schemas"]["ParticipantResponseDto"];
  study: components["schemas"]["StudyResponseDto"];
};

export const $questionnaire = map<Questionnaire>();
