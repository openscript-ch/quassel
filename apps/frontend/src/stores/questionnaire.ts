import { persistentAtom } from "@nanostores/persistent";
import { components } from "../api.gen";

type Questionnaire = {
  participant: components["schemas"]["ParticipantResponseDto"];
  study: components["schemas"]["StudyDetailResponseDto"];
};

export const $questionnaire = persistentAtom<Questionnaire | undefined>("questionnaire", undefined, {
  encode: JSON.stringify,
  decode: JSON.parse,
});
