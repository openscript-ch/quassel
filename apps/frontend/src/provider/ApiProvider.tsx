import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../types/api";

const fetchClient = createFetchClient<paths>({
  baseUrl: "http://localhost:3000",
});
export const $api = createClient(fetchClient);

export function ApiProvider({ children }: PropsWithChildren) {
  const queryClient = new QueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
