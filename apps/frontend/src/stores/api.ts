import createFetchClient, { MaybeOptionalInit } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { components, paths } from "../api.gen";
import { C } from "../configuration";
import { useDownload } from "../hooks/useDownload";
import { PathsWithMethod } from "openapi-typescript-helpers";
import { NotificationData, notifications } from "@quassel/ui";

const fetchClient = createFetchClient<paths>({
  baseUrl: C.env.apiUrl,
  credentials: "include",
});

fetchClient.use({
  onResponse: ({ response }) => {
    if (!response.ok) {
      response.json().then((r) => {
        const { message, error } = r as components["schemas"]["ErrorResponseDto"];

        const notificationData: NotificationData = { color: "uzhBerry", message, title: error };

        if (response.status >= 500) {
          notificationData.title = `Something went wrong (${response.status})`;
        }

        notifications.show(notificationData);
      });
    }
  },
});

const apiClient = createClient(fetchClient);

// Wrap the useDownload hook to download a file from the API
const useApiDownload = <Path extends PathsWithMethod<paths, "get">>(
  fileUrl: Path,
  fileName: string,
  init: MaybeOptionalInit<paths[Path], "get">
) => {
  return useDownload(fileUrl, fileName, async () => {
    // Fetch the file as a stream so the fetch client doesn't try to parse it as JSON and we can track the download progress
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const get = await fetchClient.GET(fileUrl, { ...init, parseAs: "stream" } as any);
    return get.response;
  });
};

export const $api = {
  ...apiClient,
  useDownload: useApiDownload,
};
