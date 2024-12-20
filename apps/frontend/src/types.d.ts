import "@tanstack/react-query";
import "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      statusCode: number;
      message: string;
      error?: string;
    };
  }
}

declare module "@tanstack/react-router" {
  interface RouteContext {
    queryClient: QueryClient;
    title?: string;
  }
}

declare global {
  interface Window {
    env?: {
      apiUrl?: string;
    };
  }
}
