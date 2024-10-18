import { persistentMap } from "@nanostores/persistent";

export type Session = {
  id?: string;
  email?: string;
  token?: string;
};

export const $session = persistentMap<Session>("session:", {});
