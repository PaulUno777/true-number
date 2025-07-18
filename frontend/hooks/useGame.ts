"use client";

import { useQuery, useMutation, useQueryClient } from "react-query";
import api from "@/lib/api";

export const useGame = () => {
  const queryClient = useQueryClient();

  const { data: userBalance, isLoading: balanceLoading } = useQuery(
    "userBalance",
    async () => {
      const response = await api.get("/game/balance");
      return response.data;
    }
  );

  const playGameMutation = useMutation(
    async () => {
      const response = await api.post("/game/play");
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("userBalance");
        queryClient.invalidateQueries("gameHistory");
        queryClient.invalidateQueries("gameStats");
      },
    }
  );

  return {
    userBalance,
    balanceLoading,
    playGame: playGameMutation.mutateAsync,
    isLoading: playGameMutation.isLoading,
  };
};
