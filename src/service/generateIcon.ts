import axios, { AxiosProgressEvent } from "axios";

export interface GenerateIconProps {
  fileName: string;
  contents: string;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const generateIcon = async ({ fileName, contents, signal, onUploadProgress }: GenerateIconProps) => {
  const { data } = await axios.post(
    "/api/icon",
    {
      fileName,
      contents,
    },
    {
      signal,
      onUploadProgress,
    },
  );

  return data;
};
