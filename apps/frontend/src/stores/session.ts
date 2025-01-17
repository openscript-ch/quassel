import { persistentAtom } from "@nanostores/persistent";
import { components } from "../api.gen";

type Session = Partial<Omit<components["schemas"]["SessionResponseDto"], "id">>;

export const $session = persistentAtom<Session>(
  "session",
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  }
);
