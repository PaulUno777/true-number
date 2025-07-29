import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useGameErrorHandler = () => {
  const t = useTranslations("dashboard");

  return useCallback((error: unknown, fallbackKey: string) => {
    let errorMessage: string;
    
    if (error instanceof AxiosError) {
      // Handle specific HTTP status codes
      if (error.response?.status === 404) {
        errorMessage = t("gameNotFound", { defaultValue: "Game not found" });
      } else if (error.response?.status === 403) {
        errorMessage = t("notAuthorized", { defaultValue: "Not authorized for this action" });
      } else if (error.response?.status === 400) {
        errorMessage = error.response?.data?.message || t("invalidRequest", { defaultValue: "Invalid request" });
      } else if (error.response?.status >= 500) {
        errorMessage = t("serverError", { defaultValue: "Server error. Please try again." });
      } else {
        errorMessage = error.response?.data?.message || t(fallbackKey, { defaultValue: "An error occurred" });
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = t(fallbackKey, { defaultValue: "An error occurred" });
    }
    
    toast.error(errorMessage);
  }, [t]);
};