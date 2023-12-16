import { AxiosProgressEvent } from "axios";
import { apiWrapper } from "@/service/apiWrapper";

export interface GenerateIconProps {
  targetPath: string;
  iconPrefix?: string;
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const savePreference = async ({ targetPath, iconPrefix, signal, onUploadProgress }: GenerateIconProps) => {
  const { data } = await apiWrapper(
    "put",
    "/api/config",
    {
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
