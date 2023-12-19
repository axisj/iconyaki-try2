import { AxiosProgressEvent } from "axios";
import { apiWrapper } from "./apiWrapper.ts";

export interface GenerateIconProps {
  fileName: string;
  contents: string;
  projectName: string;
  iconPrefix: string;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const generateIcon = async ({
  fileName,
  contents,
  projectName,
  iconPrefix,
  signal,
  onUploadProgress,
}: GenerateIconProps) => {
  const { data } = await apiWrapper(
    "post",
    "/api/icon",
    {
      fileName,
      contents,
      projectName,
      iconPrefix,
    },
    {
      signal,
      onUploadProgress,
    },
  );

  return data;
};
