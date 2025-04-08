import "@tanstack/react-query";
import "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { ReactElement } from "react";

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
    actions?: ReactElement[];
  }
}

declare global {
  interface Window {
    env?: {
      apiUrl?: string;
      themeColor?: string;
      title?: string;
      logoUrl?: string;
    };
  }
}
