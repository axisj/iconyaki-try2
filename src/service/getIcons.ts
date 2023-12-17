import { IconyakiData } from "@/iconyaki/@types";
import { apiWrapper } from "@/service/apiWrapper";

export interface GetIconProps {
  projectName?: string;
}

export const getIcons = async ({ projectName }: GetIconProps) => {
  const { data } = await apiWrapper<IconyakiData>("get", "/api/icon", { projectName });
  return data;
};
