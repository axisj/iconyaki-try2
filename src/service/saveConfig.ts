import { AxiosProgressEvent } from "axios";
import { apiWrapper } from "./apiWrapper";
import { Config } from "../types";
import { del, get, set } from "idb-keyval";

export interface GenerateIconProps extends Config {
  signal?: AbortSignal;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}
export const saveConfig = async ({
  signal,
  onUploadProgress,
  ...rest
}: GenerateIconProps) => {
  await set("config", {
    ...rest,
  });

  return await get("config");
};
