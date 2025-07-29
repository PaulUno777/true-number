import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import {
  GameEventEmitter,
  GameLifecycleEvents,
  PlayerActionEvents,
  TimerEvents,
  SystemEvents,
  GAME_EVENTS,
} from './types/game-events.types';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/prisma';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

@Injectable()
@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class GameGateway
  implements OnGatewayConnection, OnGatewayDisconnect, GameEventEmitter
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('GameGateway');
  private userSockets = new Map<string, AuthenticatedSocket>();

  constructor(private prisma: PrismaService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      // Extract user info from JWT token in handshake
      const token = client.handshake.auth?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      // You would decode the JWT token here
      const userId = client.handshake.query?.userId as string;
      const username = client.handshake.query?.username as string;

      if (!userId) {
        client.disconnect();
        return;
      }

      client.userId = userId;
      client.username = username;
      this.userSockets.set(userId, client);

      this.logger.log(`🔌 User ${username} (${userId}) connected - using broadcast mode`);

      // Send current game state if user has an active game
      await this.sendActiveGameState(userId);
    } catch (error) {
      this.logger.error('Connection error:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.userSockets.delete(client.userId);
      this.logger.log(
        `User ${client.username} (${client.userId}) disconnected`,
      );
    }
  }

  @SubscribeMessage('join-game')
  handleJoinGame(client: AuthenticatedSocket, data: { gameId: string }) {
    if (!client.userId) {
      this.logger.warn('Unauthorized join-game attempt');
      return;
    }

    const { gameId } = data;
    
    // No room management needed - all messages are broadcast
    this.logger.log(`🎮 User ${client.username} requested to join game ${gameId} - using broadcast mode`);

    return { success: true, gameId };
  }

  @SubscribeMessage('leave-game')
  handleLeaveGame(client: AuthenticatedSocket, data: { gameId: string }) {
    if (!client.userId) {
      this.logger.warn('Unauthorized leave-game attempt');
      return;
    }

    const { gameId } = data;
    
    // No room management needed - all messages are broadcast
    this.logger.log(`User ${client.username} left game ${gameId} - using broadcast mode`);

    return { success: true, gameId };
  }

  emitGameCreated(event: GameLifecycleEvents.GameCreated): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.GAME_CREATED, event);
    
    // Also send game state to update the creator's state
    this.emitGameState({ game: event.game, timestamp: new Date() });
    
    this.logger.log(`🔥 Broadcasting: Game created: ${event.game.id}`);
  }

  emitGameJoined(event: GameLifecycleEvents.GameJoined): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.GAME_JOINED, event);
    this.logger.log(
      `🔥 Broadcasting: Player ${event.joinedPlayerUsername} joined game ${event.gameId}`,
    );
  }

  emitGameStarted(event: GameLifecycleEvents.GameStarted): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.GAME_STARTED, event);
    this.logger.log(`🔥 Broadcasting: Game started: ${event.gameId}`);
  }

  emitGameFinished(event: GameLifecycleEvents.GameFinished): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.GAME_FINISHED, event);
    this.logger.log(
      `🔥 Broadcasting: Game finished: ${event.gameId}, winner: ${event.winnerId}`,
    );
  }

  emitGameCancelled(event: GameLifecycleEvents.GameCancelled): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.GAME_CANCELLED, event);
    this.logger.log(`🔥 Broadcasting: Game cancelled: ${event.gameId}, reason: ${event.reason}`);
  }

  emitTurnPlayed(event: PlayerActionEvents.TurnPlayed): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.TURN_PLAYED, event);
    this.logger.log(
      `🔥 Broadcasting: Turn played in game ${event.gameId} by ${event.playerUsername}: ${event.generatedNumber}`,
    );
  }

  emitPlayerJoinedRoom(event: PlayerActionEvents.PlayerJoinedRoom): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.PLAYER_JOINED_ROOM, event);
    this.logger.log(
      `🔥 Broadcasting: Player ${event.username} joined room for game ${event.gameId}`,
    );
  }

  emitPlayerLeftRoom(event: PlayerActionEvents.PlayerLeftRoom): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.PLAYER_LEFT_ROOM, event);
    this.logger.log(
      `🔥 Broadcasting: Player ${event.username} left room for game ${event.gameId}`,
    );
  }

  emitPlayerLeftGame(event: PlayerActionEvents.PlayerLeftGame): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.PLAYER_LEFT_GAME, event);
    this.logger.log(`🔥 Broadcasting: Player left game ${event.gameId}`);
  }

  emitTimerUpdate(event: TimerEvents.TimerUpdate): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.TIMER_UPDATE, event);
    this.logger.log(`🔥 Broadcasting: Timer update for game ${event.gameId}`);
  }

  emitTimerEnded(event: TimerEvents.TimerEnded): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.TIMER_ENDED, event);
    this.logger.log(`🔥 Broadcasting: Timer ended for game ${event.gameId}`);
  }

  emitTimeoutForfeit(event: TimerEvents.TimeoutForfeit): void {
    // Broadcast to all connected clients - frontend will filter by gameId
    this.server.emit(GAME_EVENTS.TIMEOUT_FORFEIT, event);
    this.logger.log(
      `🔥 Broadcasting: Timeout forfeit in game ${event.gameId} for user ${event.timeoutUserId}`,
    );
  }

  emitGameState(event: SystemEvents.GameState): void {
    // Broadcast to all connected clients - frontend will filter by gameId/userId
    this.server.emit(GAME_EVENTS.GAME_STATE, event);
    this.logger.log(`🔥 Broadcasting: Game state for game ${event.game?.id}`);
  }
  emitWaitingGames(event: SystemEvents.WaitingGames): void {
    this.server.emit(GAME_EVENTS.WAITING_GAMES, event);
    this.logger.log(`Waiting games updated: ${event.games.length} games`);
  }
  emitError(event: SystemEvents.Error): void {
    this.server.emit(GAME_EVENTS.ERROR, event);
    this.logger.error(`Error event: ${event.message}`);
  }

  private async sendActiveGameState(userId: string): Promise<void> {
    try {
      // Find user's active game participation
      const activeParticipation =
        await this.prisma.multiplayerParticipant.findFirst({
          where: {
            playerId: userId,
            game: {
              status: {
                in: ['WAITING', 'IN_PROGRESS'],
              },
            },
          },
          include: {
            game: {
              include: {
                players: {
                  include: { player: true },
                },
                creator: true,
              },
            },
          },
        });

      if (activeParticipation?.game) {
        const gameId = activeParticipation.game.id;

        this.logger.log(
          `🔄 Sending active game state for user ${userId}, game ${gameId} (status: ${activeParticipation.game.status})`,
        );

        // Send current game state to ensure frontend consistency
        this.emitGameState({
          game: {
            id: activeParticipation.game.id,
            status: activeParticipation.game.status,
            bet: activeParticipation.game.bet,
            thinkingTime: activeParticipation.game.thinkingTime,
            createdBy: activeParticipation.game.createdBy,
            creatorUsername: activeParticipation.game.creator.username,
            currentTurnPlayerId: activeParticipation.game.currentTurnPlayerId || undefined,
            winnerId: activeParticipation.game.winnerId || undefined,
            players: activeParticipation.game.players.map((p: any) => ({
              id: p.player.id,
              username: p.player.username,
              generatedNumber: p.generatedNumber,
              playedAt: p.playedAt,
              isWinner: p.isWinner,
              balanceChange: p.balanceChange,
            })),
            createdAt: activeParticipation.game.createdAt,
            startedAt: activeParticipation.game.startedAt || undefined,
            finishedAt: activeParticipation.game.finishedAt || undefined,
          },
          timestamp: new Date(),
        });
      }
    } catch (error) {
      this.logger.error(
        `Failed to send active game state for user ${userId}:`,
        error,
      );
      // Don't disconnect on error - user can still use the app normally
    }
  }
}
