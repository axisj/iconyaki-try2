import { AxiosProgressEvent } from "axios";
import { apiWrapper } from "@/service/apiWrapper";
import { SaveIconRequest } from "@/app/api/icon/route";

export interface GenerateIconProps extends SaveIconRequest {
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const generateIcon = async ({
  fileName,
  contents,
  targetPath,
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
      targetPath,
      iconPrefix,
    },
    {
      signal,
      onUploadProgress,
    },
  );

  return data;
};
