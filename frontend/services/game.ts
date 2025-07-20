import { api } from './api';
import { GamePlayResponse, GameHistoryResponse, GlobalStats } from '@/types/game';

interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string[];
  filter?: string[];
}

class GameService {
  async playGame(): Promise<GamePlayResponse> {
    const response = await api.post<GamePlayResponse>('/game/play');
    return response.data;
  }

  async getBalance(): Promise<{ balance: number }> {
    const response = await api.get<{ balance: number }>('/game/balance');
    return response.data;
  }

  async getHistory(params?: PaginationParams): Promise<GameHistoryResponse> {
    const response = await api.get<GameHistoryResponse>('/game/history', {
      params,
    });
    return response.data;
  }

  async getAllHistory(params?: PaginationParams): Promise<GameHistoryResponse> {
    const response = await api.get<GameHistoryResponse>('/game/history/all', {
      params,
    });
    return response.data;
  }

  async getGlobalStats(): Promise<GlobalStats> {
    const response = await api.get<GlobalStats>('/game/stats/global');
    return response.data;
  }
}

export const gameService = new GameService();