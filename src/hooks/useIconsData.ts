import { IconyakiIcon } from "@/iconyaki/@types";
import { useCallback, useEffect, useState } from "react";
import service from "@/service";
import { useAppStore } from "@/store/useAppStore";

export function useIconsData(projectName?: string) {
  const [icons, setIcons] = useState<IconyakiIcon[]>([]);
  const [loading, setLoading] = useState(false);
  const setErrors = useAppStore((state) => state.setErrors);

  const getIcons = useCallback(async () => {
    try {
      if (!projectName) return setIcons([]);
      const data = await service.getIcons({ projectName });

      setIcons(data.icons);
    } catch (err: any) {
      console.error(err);
      setErrors([err]);
    }
  }, [setErrors, projectName]);

  useEffect(() => {
    getIcons().then();

    return () => {
      setIcons([]);
      setErrors([]);
    };
  }, [getIcons, setErrors]);

  return {
    icons,
    getIcons,
    loading,
  };
}
