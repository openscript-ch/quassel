import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../api.gen";
import { C } from "../configuration";

const fetchClient = createFetchClient<paths>({
  baseUrl: C.env.apiUrl,
  credentials: "include",
});
export const $api = createClient(fetchClient);
