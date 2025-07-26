import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MultiGameService } from './multi-game.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  username?: string;
}

@WebSocketGateway({
  path: '/socket.io',
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('GameGateway');
  private userSockets = new Map<string, AuthenticatedSocket>();

  constructor(private gameService: MultiGameService) {
    // Set circular reference after construction
    this.gameService.setGameGateway(this);
  }

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
  async handleJoinGame(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const { gameId } = data;

      // Join the game room
      client.join(`game:${gameId}`);

      // Get game details
      const gameDetails = await this.gameService.getGameDetails(gameId);

      // Notify other players in the game that someone joined
      client.to(`game:${gameId}`).emit('player-joined', {
        userId: client.userId,
        username: client.username,
        game: gameDetails.game,
        timestamp: new Date(),
      });

      // Send game state to the joining player
      client.emit('game-state', {
        game: gameDetails.game,
      });

      this.logger.log(`User ${client.username} joined game ${gameId}`);
    } catch (error) {
      this.logger.error('Join game error:', error);
      client.emit('error', { message: 'Failed to join game' });
    }
  }

  @SubscribeMessage('leave-game')
  async handleLeaveGame(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const { gameId } = data;

      if (!client.userId) {
        client.emit('error', { message: 'User not authenticated' });
        return;
      }

      // Process leave game via service
      const result = await this.gameService.leaveGame(client.userId, gameId);

      // Leave the game room
      client.leave(`game:${gameId}`);

      // Notify other players about the leave
      client.to(`game:${gameId}`).emit('player-left', {
        userId: client.userId,
        username: client.username,
        game: result.game,
        timestamp: new Date(),
      });

      // If game was forfeited, notify about the winner
      if (result.game.status === 'FINISHED' && result.game.winnerId) {
        const winner = result.game.players.find((p) => p.isWinner);
        this.server.to(`game:${gameId}`).emit('game-finished', {
          winnerId: result.game.winnerId,
          winnerUsername: winner?.username,
          game: result.game,
          message: `${winner?.username} gagne par forfait et reçoit ${result.game.bet} points !`,
          timestamp: new Date(),
        });
      }

      // Send confirmation to the leaving player
      client.emit('game-left', {
        game: result.game,
        message: result.message,
        timestamp: new Date(),
      });

      this.logger.log(`User ${client.username} left game ${gameId}`);
    } catch (error) {
      this.logger.error('Leave game error:', error);
      client.emit('error', {
        message: error.message || 'Failed to leave game',
      });
    }
  }

  @SubscribeMessage('play-turn')
  async handlePlayTurn(
    @MessageBody() data: { gameId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      const { gameId } = data;

      if (!client.userId) {
        client.emit('error', { message: 'User not authenticated' });
        return;
      }

      // Play the turn via service
      const result = await this.gameService.playTurn(client.userId, gameId);

      // Notify all players in the game about the turn
      this.server.to(`game:${gameId}`).emit('turn-played', {
        userId: client.userId,
        username: client.username,
        generatedNumber: result.generatedNumber,
        game: result.game,
        timestamp: new Date(),
      });

      // If game is finished, notify about winner
      if (result.game.status === 'FINISHED') {
        const winner = result.game.players.find((p) => p.isWinner);
        this.server.to(`game:${gameId}`).emit('game-finished', {
          winnerId: result.game.winnerId,
          winnerUsername: winner?.username,
          game: result.game,
          message: `${winner?.username} gagne la partie et reçoit ${result.game.bet} points !`,
          timestamp: new Date(),
        });
      }

      this.logger.log(
        `User ${client.username} played turn in game ${gameId}: ${result.generatedNumber}`,
      );
    } catch (error) {
      this.logger.error('Play turn error:', error);
      client.emit('error', { message: error.message || 'Failed to play turn' });
    }
  }

  @SubscribeMessage('get-waiting-games')
  async handleGetWaitingGames(@ConnectedSocket() client: AuthenticatedSocket) {
    try {
      const waitingGames = await this.gameService.getWaitingGames();
      client.emit('waiting-games', waitingGames);
    } catch (error) {
      this.logger.error('Get waiting games error:', error);
      client.emit('error', { message: 'Failed to get waiting games' });
    }
  }

  // Utility methods to emit events from service
  notifyGameCreated(game: any) {
    // Auto-join the creator to their own game room
    const creatorSocket = this.userSockets.get(game.createdBy);
    if (creatorSocket) {
      creatorSocket.join(`game:${game.id}`);

      // Send game state to the creator
      creatorSocket.emit('game-state', {
        game: game,
      });
    }

    // Notify all clients about the new game
    this.server.emit('new-game-created', {
      game,
      timestamp: new Date(),
    });
  }

  notifyGameJoined(gameId: string, game: any) {
    this.server.to(`game:${gameId}`).emit('game-started', {
      game,
      message: 'La partie commence ! Que le meilleur gagne !',
      timestamp: new Date(),
    });
  }

  startGameTimer(gameId: string, duration: number) {
    let remainingTime = duration;

    const timer = setInterval(() => {
      this.server.to(`game:${gameId}`).emit('game-timer', {
        remainingTime,
        timestamp: new Date(),
      });

      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(timer);
        this.server.to(`game:${gameId}`).emit('game-timer-ended', {
          message: 'Temps écoulé !',
          timestamp: new Date(),
        });
      }
    }, 1000);
  }
}
