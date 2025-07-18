"use client";

import { useQuery } from "react-query";
import api from "@/lib/api";

interface UseUsersOptions {
  page?: number;
  size?: number;
}

export const useUsers = (options: UseUsersOptions = {}) => {
  const { page = 1, size = 10 } = options;

  return useQuery(["users", page, size], async () => {
    const response = await api.get("/users", {
      params: { page, size, sort: ["createdAt:desc"] },
    });
    return response.data;
  });
};
