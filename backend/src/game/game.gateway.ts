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

      this.logger.log(`User ${username} (${userId}) connected`);

      // Join user to his own room for personal notifications
      client.join(`user:${userId}`);

      // Auto-rejoin user to their active game room if they have one
      await this.autoRejoinActiveGame(client, userId);
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
    client.join(`game:${gameId}`);
    
    // Check room population after manual join
    const gameRoomName = `game:${gameId}`;
    const roomSockets = this.server.sockets.adapter.rooms.get(gameRoomName);
    const clientCount = roomSockets ? roomSockets.size : 0;
    
    this.logger.log(`🎮 Manual join: User ${client.username} joined room for game ${gameId}. Room now has ${clientCount} clients`);

    return { success: true, gameId };
  }

  @SubscribeMessage('leave-game')
  handleLeaveGame(client: AuthenticatedSocket, data: { gameId: string }) {
    if (!client.userId) {
      this.logger.warn('Unauthorized leave-game attempt');
      return;
    }

    const { gameId } = data;
    client.leave(`game:${gameId}`);
    this.logger.log(`User ${client.username} left room for game ${gameId}`);

    return { success: true, gameId };
  }

  emitGameCreated(event: GameLifecycleEvents.GameCreated): void {
    // Auto-join the creator to their own game room
    const creatorSocket = this.userSockets.get(event.game.createdBy);
    if (creatorSocket) {
      creatorSocket.join(`game:${event.game.id}`);
      // Send game state to the creator
      this.emitGameState({ game: event.game, timestamp: new Date() });
    }

    // Notify all clients about the new game
    this.server.emit(GAME_EVENTS.GAME_CREATED, event);
    this.logger.log(`Game created: ${event.game.id}`);
  }

  emitGameJoined(event: GameLifecycleEvents.GameJoined): void {
    // Auto-join the joining player to the game room
    const joiningSocket = this.userSockets.get(event.joinedPlayerId);
    if (joiningSocket) {
      joiningSocket.join(`game:${event.gameId}`);
      this.logger.log(`✅ Socket auto-joined: ${event.joinedPlayerUsername} to game:${event.gameId}`);
    } else {
      this.logger.warn(`❌ No socket found for joining player: ${event.joinedPlayerUsername} (${event.joinedPlayerId})`);
    }

    // Check room population after join
    const gameRoomName = `game:${event.gameId}`;
    const roomSockets = this.server.sockets.adapter.rooms.get(gameRoomName);
    const clientCount = roomSockets ? roomSockets.size : 0;
    this.logger.log(`📊 Game room ${gameRoomName} now has ${clientCount} clients`);

    // Notify other players in the room that someone joined
    this.server.to(`game:${event.gameId}`).emit(GAME_EVENTS.GAME_JOINED, event);
    this.logger.log(
      `Player ${event.joinedPlayerUsername} joined game ${event.gameId}`,
    );
  }

  emitGameStarted(event: GameLifecycleEvents.GameStarted): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.GAME_STARTED, event);
    this.logger.log(`Game started: ${event.gameId}`);
  }

  emitGameFinished(event: GameLifecycleEvents.GameFinished): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.GAME_FINISHED, event);
    this.logger.log(
      `Game finished: ${event.gameId}, winner: ${event.winnerId}`,
    );
  }

  emitGameCancelled(event: GameLifecycleEvents.GameCancelled): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.GAME_CANCELLED, event);
    this.logger.log(`Game cancelled: ${event.gameId}, reason: ${event.reason}`);
  }

  emitTurnPlayed(event: PlayerActionEvents.TurnPlayed): void {
    const gameRoomName = `game:${event.gameId}`;
    const roomSockets = this.server.sockets.adapter.rooms.get(gameRoomName);
    const clientCount = roomSockets ? roomSockets.size : 0;
    
    this.logger.log(
      `Turn played in game ${event.gameId} by ${event.playerUsername}: ${event.generatedNumber}. Room ${gameRoomName} has ${clientCount} clients`,
    );
    
    this.server.to(gameRoomName).emit(GAME_EVENTS.TURN_PLAYED, event);
  }

  emitPlayerJoinedRoom(event: PlayerActionEvents.PlayerJoinedRoom): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.PLAYER_JOINED_ROOM, event);
    this.logger.log(
      `Player ${event.username} joined room for game ${event.gameId}`,
    );
  }

  emitPlayerLeftRoom(event: PlayerActionEvents.PlayerLeftRoom): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.PLAYER_LEFT_ROOM, event);
    this.logger.log(
      `Player ${event.username} left room for game ${event.gameId}`,
    );
  }

  emitPlayerLeftGame(event: PlayerActionEvents.PlayerLeftGame): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.PLAYER_LEFT_GAME, event);
    this.logger.log(`Player left game ${event.gameId}`);
  }

  emitTimerUpdate(event: TimerEvents.TimerUpdate): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.TIMER_UPDATE, event);
  }

  emitTimerEnded(event: TimerEvents.TimerEnded): void {
    this.server.to(`game:${event.gameId}`).emit(GAME_EVENTS.TIMER_ENDED, event);
    this.logger.log(`Timer ended for game ${event.gameId}`);
  }

  emitTimeoutForfeit(event: TimerEvents.TimeoutForfeit): void {
    this.server
      .to(`game:${event.gameId}`)
      .emit(GAME_EVENTS.TIMEOUT_FORFEIT, event);
    this.logger.log(
      `Timeout forfeit in game ${event.gameId} for user ${event.timeoutUserId}`,
    );
  }

  emitGameState(event: SystemEvents.GameState): void {
    // Send to specific user sockets based on game participants
    if (event.game) {
      event.game.players.forEach((player) => {
        const socket = this.userSockets.get(player.id);
        if (socket) {
          socket.emit(GAME_EVENTS.GAME_STATE, event);
        }
      });
      // Also send to creator if not already a player
      const creatorSocket = this.userSockets.get(event.game.createdBy);
      if (creatorSocket) {
        creatorSocket.emit(GAME_EVENTS.GAME_STATE, event);
      }
    }
  }
  emitWaitingGames(event: SystemEvents.WaitingGames): void {
    this.server.emit(GAME_EVENTS.WAITING_GAMES, event);
    this.logger.log(`Waiting games updated: ${event.games.length} games`);
  }
  emitError(event: SystemEvents.Error): void {
    this.server.emit(GAME_EVENTS.ERROR, event);
    this.logger.error(`Error event: ${event.message}`);
  }

  private async autoRejoinActiveGame(
    client: AuthenticatedSocket,
    userId: string,
  ): Promise<void> {
    try {
      // Find user's active game participation
      const activeParticipation =
        await this.prisma.multiplayerParticipant.findFirst({
          where: {
            id: userId,
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

        // Rejoin the user to their game room
        client.join(`game:${gameId}`);

        this.logger.log(
          `User ${client.username} auto-rejoined room for active game ${gameId} (status: ${activeParticipation.game.status})`,
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
        `Failed to auto-rejoin user ${userId} to active game:`,
        error,
      );
      // Don't disconnect on error - user can still use the app normally
    }
  }
}
