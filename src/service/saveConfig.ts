import { AxiosProgressEvent } from "axios";
import { apiWrapper } from "@/service/apiWrapper";
import { Config } from "@/types";

export interface GenerateIconProps extends Config {
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const saveConfig = async ({ signal, onUploadProgress, ...rest }: GenerateIconProps) => {
  const { data } = await apiWrapper(
    "put",
    "/api/config",
    {
      ...rest,
    },
    {
      signal,
      onUploadProgress,
    },
  );

  return data;
};
