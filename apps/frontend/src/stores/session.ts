import { persistentMap } from "@nanostores/persistent";

type Session = {
  id?: string;
  email?: string;
  token?: string;
};

export const $session = persistentMap<Session>("session:", {});
