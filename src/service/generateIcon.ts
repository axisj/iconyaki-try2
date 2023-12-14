import axios, { AxiosProgressEvent } from "axios";

export interface GenerateIconProps {
  fileName: string;
  contents: string;
  targetPath: string;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const generateIcon = async ({ fileName, contents, targetPath, signal, onUploadProgress }: GenerateIconProps) => {
  const { data } = await axios.post(
    "/api/icon",
    {
      fileName,
      contents,
      targetPath,
    },
    {
      signal,
      onUploadProgress,
    },
  );

  return data;
};
