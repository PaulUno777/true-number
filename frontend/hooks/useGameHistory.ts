'use client';

import { useQuery } from 'react-query';
import api from '@/lib/api';

interface UseGameHistoryOptions {
  page?: number;
  size?: number;
}

export const useGameHistory = (options: UseGameHistoryOptions = {}) => {
  const { page = 1, size = 10 } = options;

  return useQuery(
    ['gameHistory', page, size],
    async () => {
      const response = await api.get('/game/history', {
        params: { page, size, sort: ['playedAt:desc'] },
      });
      return response.data;
    }
  );
};
