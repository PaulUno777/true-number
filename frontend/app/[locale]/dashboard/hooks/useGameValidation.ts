import { useCallback } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export const useGameValidation = (balance: number) => {
  const t = useTranslations("dashboard");

  const validateBetAmount = useCallback((betAmount: number): boolean => {
    if (betAmount > balance) {
      toast.error(t("insufficientBalance"));
      return false;
    }
    if (betAmount < 1) {
      toast.error(t("invalidBetAmount"));
      return false;
    }
    return true;
  }, [balance, t]);

  const validateGameJoin = useCallback((game: { bet: number }): boolean => {
    if (game.bet > balance) {
      toast.error(t("insufficientBalanceJoin"));
      return false;
    }
    return true;
  }, [balance, t]);

  return {
    validateBetAmount,
    validateGameJoin,
    canAfford: (amount: number) => amount <= balance,
  };
};