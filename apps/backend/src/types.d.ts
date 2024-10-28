import { SessionData as FastifySessionData } from "@fastify/secure-session";
import { User } from "./users/entities/user.entity";

declare module "@fastify/secure-session" {
  interface SessionData extends FastifySessionData {
    userId?: number;
  }
}

declare module "fastify" {
  interface FastifyRequest {
    user?: User;
  }
}
