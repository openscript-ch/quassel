import { useState } from "react";

/**
 * This hook is used to download a file from a given URL.
 * It handles the download progress and errors.
 *
 * @params fileUrl: The URL of the file to download.
 * @params fileName: The name of the file to download.
 * @params response: A function that returns a promise that resolves to a Response object.
 */
export const useDownload = (fileUrl: string, fileName: string, response?: () => Promise<Response>) => {
  const [error, setError] = useState<Error | unknown | null>(null);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);

  const handleResponse = async (response: Response): Promise<string> => {
    if (!response.ok) {
      throw new Error("Could not download file");
    }

    const contentLength = response.headers.get("content-length");
    const reader = response.body?.getReader();

    if (!contentLength || !reader) {
      const blob = await response.blob();

      return createBlobURL(blob);
    }

    const stream = await getStream(contentLength, reader);
    const newResponse = new Response(stream);
    const blob = await newResponse.blob();

    return createBlobURL(blob);
  };

  const getStream = async (contentLength: string, reader: ReadableStreamDefaultReader<Uint8Array>): Promise<ReadableStream<Uint8Array>> => {
    let loaded = 0;
    const total = parseInt(contentLength, 10);

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for (;;) {
            const { done, value } = await reader.read();

            if (done) break;

            loaded += value.byteLength;
            const percentage = Math.trunc((loaded / total) * 100);
            setProgress(percentage);
            controller.enqueue(value);
          }
        } catch (error) {
          controller.error(error);
          throw error;
        } finally {
          controller.close();
        }
      },
    });
  };

  const createBlobURL = (blob: Blob): string => {
    return window.URL.createObjectURL(blob);
  };

  const handleDownload = (fileName: string, url: string) => {
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const downloadFile = async () => {
    setIsDownloading(true);
    setError(null);
    setProgress(null);

    try {
      const res = response ? response() : fetch(fileUrl);
      const url = await handleResponse(await res);

      handleDownload(fileName, url);
    } catch (error) {
      setError(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    error,
    isDownloading,
    progress,
    downloadFile,
  };
};
