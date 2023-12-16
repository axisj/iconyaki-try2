import { IconyakiData } from "@/iconyaki/@types";
import { apiWrapper } from "@/service/apiWrapper";

export interface GetIconProps {
  targetPath?: string;
}

export const getIcons = async ({ targetPath }: GetIconProps) => {
  const { data } = await apiWrapper<IconyakiData>("get", "/api/icon", { targetPath });
  return data;
};
