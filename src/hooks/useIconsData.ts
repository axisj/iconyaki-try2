import { IconyakiIcon } from "@/iconyaki/@types";
import { useCallback, useEffect, useState } from "react";
import service from "@/service";
import { useAppStore } from "@/store/useAppStore";

export function useIconsData(targetPath?: string) {
  const [icons, setIcons] = useState<IconyakiIcon[]>([]);
  const setErrors = useAppStore((state) => state.setErrors);

  const getIcons = useCallback(async () => {
    try {
      if (!targetPath) return setIcons([]);
      const data = await service.getIcons({ targetPath });

      setIcons(data.icons);
    } catch (err: any) {
      console.error(err);
      setErrors([err]);
    }
  }, [setErrors, targetPath]);

  useEffect(() => {
    getIcons().then();

    return () => {
      setIcons([]);
      setErrors([]);
    };
  }, [getIcons, setErrors]);

  return {
    icons,
  };
}
