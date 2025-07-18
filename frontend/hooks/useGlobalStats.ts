"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";

export const useGlobalStats = () => {
  return useQuery("globalStats", async () => {
    const response = await api.get("/game/stats/global");
    return response.data;
  });
};
