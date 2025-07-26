import { api } from './api';
import {
  CreateGameDto,
  CreateGameResponse,
  GetWaitingGamesResponse,
  JoinGameResponse,
  PlayTurnResponse,
  GetUserGamesResponse,
  MultiplayerStats,
} from '@/types/multiplayer';

class MultiplayerService {
  async createGame(createGameDto: CreateGameDto): Promise<CreateGameResponse> {
    const response = await api.post<CreateGameResponse>('/multi-game/create', createGameDto);
    return response.data;
  }

  async getWaitingGames(): Promise<GetWaitingGamesResponse> {
    const response = await api.get<GetWaitingGamesResponse>('/multi-game/waiting');
    return response.data;
  }

  async joinGame(gameId: string): Promise<JoinGameResponse> {
    const response = await api.post<JoinGameResponse>(`/multi-game/join/${gameId}`);
    return response.data;
  }

  async playTurn(gameId: string, playData?: any): Promise<PlayTurnResponse> {
    const response = await api.post<PlayTurnResponse>(`/multi-game/play/${gameId}`, playData);
    return response.data;
  }

  async getGameDetails(gameId: string): Promise<CreateGameResponse> {
    const response = await api.get<CreateGameResponse>(`/multi-game/details/${gameId}`);
    return response.data;
  }

  async getUserGames(): Promise<GetUserGamesResponse> {
    const response = await api.get<GetUserGamesResponse>('/multi-game/history');
    return response.data;
  }

  async getMultiplayerStats(): Promise<MultiplayerStats> {
    const response = await api.get<MultiplayerStats>('/multi-game/stats/multiplayer');
    return response.data;
  }

  async getLastCreatedGame(): Promise<CreateGameResponse | null> {
    const response = await api.get<CreateGameResponse>('/multi-game/last-created');
    return response.data;
  }

  async getActiveGame(): Promise<CreateGameResponse | null> {
    const response = await api.get<CreateGameResponse>('/multi-game/active');
    return response.data;
  }

  async leaveGame(gameId: string): Promise<CreateGameResponse> {
    const response = await api.post<CreateGameResponse>(`/multi-game/leave/${gameId}`);
    return response.data;
  }
}

export const multiplayerService = new MultiplayerService();