import { SessionData as FastifySessionData } from "@fastify/secure-session";

declare module "@fastify/secure-session" {
  interface SessionData extends FastifySessionData {
    userId?: number;
  }
}
