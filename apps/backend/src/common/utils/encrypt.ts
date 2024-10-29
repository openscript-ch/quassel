import { bcrypt } from "hash-wasm";

export const getPasswordHash = (password: string) => {
  const salt = new Uint8Array(16);
  crypto.getRandomValues(salt);
  return bcrypt({ password, salt, costFactor: 10 });
};
