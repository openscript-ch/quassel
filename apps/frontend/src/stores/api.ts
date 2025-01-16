import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "../api.gen";
import { C } from "../configuration";
import { useDownload } from "../hooks/useDownload";
import { PathsWithMethod } from "openapi-typescript-helpers";

export const fetchClient = createFetchClient<paths>({
  baseUrl: C.env.apiUrl,
  credentials: "include",
});
const apiClient = createClient(fetchClient);

// Wrap the useDownload hook to download a file from the API
const useApiDownload = (fileUrl: PathsWithMethod<paths, "get">, fileName: string, params?: paths[typeof fileUrl]["get"]["parameters"]) => {
  return useDownload(fileUrl, fileName, async () => {
    // Fetch the file as a stream so the fetch client doesn't try to parse it as JSON and we can track the download progress
    const get = await fetchClient.GET(fileUrl, { parseAs: "stream", params: { ...params } });
    return get.response;
  });
};

export const $api = {
  ...apiClient,
  useDownload: useApiDownload,
};
