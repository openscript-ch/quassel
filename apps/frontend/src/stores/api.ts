import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../api.gen";

const fetchClient = createFetchClient<paths>({
  baseUrl: "https://api.test.quassel.ch",
  credentials: "include",
});
export const $api = createClient(fetchClient);
