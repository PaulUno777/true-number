import { api } from './api';
import {
  PlaySoloGameDto,
  PlaySoloGameResponseDto,
  GetSoloGameHistoryResponseDto,
  SoloGameStatsDto,
} from '@/types/solo';

class SoloService {
  async play(request: PlaySoloGameDto): Promise<PlaySoloGameResponseDto> {
    const response = await api.post<PlaySoloGameResponseDto>('/solo-game/play', request);
    return response.data;
  }

  async getHistory(): Promise<GetSoloGameHistoryResponseDto> {
    const response = await api.get<GetSoloGameHistoryResponseDto>('/solo-game/history');
    return response.data;
  }

  async getStats(): Promise<SoloGameStatsDto> {
    const response = await api.get<SoloGameStatsDto>('/solo-game/stats');
    return response.data;
  }
}

export const soloService = new SoloService();