import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGameErrorHandler = () => {
  const t = useTranslations("dashboard");

  return useCallback((error: unknown, fallbackKey: string) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data?.message || t(fallbackKey));
    } else {
      toast.error(t(fallbackKey));
    }
  }, [t]);
};