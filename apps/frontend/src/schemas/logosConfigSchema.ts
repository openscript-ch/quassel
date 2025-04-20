import { Type, type Static } from "@sinclair/typebox";

export const logosConfigSchema = Type.Array(
  Type.Object({
    path: Type.String(),
    alt: Type.String(),
    url: Type.String(),
  })
);

export type LogosConfig = Static<typeof logosConfigSchema>;
