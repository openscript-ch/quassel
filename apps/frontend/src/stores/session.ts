import { persistentMap } from "@nanostores/persistent";
import { components } from "../api.gen";

type Session = Partial<Omit<components["schemas"]["SessionResponseDto"], "id">>;

export const $session = persistentMap<Session>("session", {});
