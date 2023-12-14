import axios from "axios";
import { IconyakiData } from "@/iconyaki/@types";

export interface GenerateIconProps {
  targetPath: string;
}

export const getIcons = async ({ targetPath }: GenerateIconProps) => {
  const { data } = await axios.get<IconyakiData>(`/api/icon?targetPath=${targetPath}`, {});

  return data;
};
