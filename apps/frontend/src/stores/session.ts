import { persistentMap } from "@nanostores/persistent";

type Session = {
  email?: string;
  role?: string;
};

export const $session = persistentMap<Session>("session", {});
