import { IconyakiData } from "@/iconyaki/@types";
import { apiWrapper } from "@/service/apiWrapper";

export interface DeleteIconProps {
  projectName: string;
  id: string;
}

export const deleteIcons = async (props: DeleteIconProps) => {
  const { data } = await apiWrapper<IconyakiData>("delete", "/api/icon", { ...props });
  return data;
};
