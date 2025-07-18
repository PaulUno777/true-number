"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";

export const useGameStats = () => {
  return useQuery("gameStats", async () => {
    const response = await api.get("/game/stats");
    return response.data;
  });
};
