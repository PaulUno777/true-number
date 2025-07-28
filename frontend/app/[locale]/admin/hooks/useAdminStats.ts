import { useQuery } from "@tanstack/react-query";
import type { AdminStats, MultiplayerStats, TopPlayer, TransactionOverview } from "../types/admin.types";

// Mock API functions - replace with actual API calls
const api = {
  getAdminStats: async (): Promise<AdminStats> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      totalUsers: 1247,
      activeUsers: 892,
      totalGames: 15643,
      globalWinRate: 68.4,
      averageBalance: 245.67,
      registeredUsers: 1247,
      gamesPlayed: 15643,
      successRate: 68.4,
      wonGames: 10700,
      lostGames: 4943,
    };
  },

  getMultiplayerStats: async (): Promise<MultiplayerStats> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      totalGames: 3456,
      activeGames: 23,
      waitingGames: 8,
      averageBet: 45.50,
      averageThinkingTime: 12.3,
      topWinners: [
        { id: "1", username: "ProGamer123", wins: 156, totalGames: 200, winRate: 78.0 },
        { id: "2", username: "MathWiz", wins: 134, totalGames: 180, winRate: 74.4 },
        { id: "3", username: "NumberNinja", wins: 128, totalGames: 175, winRate: 73.1 },
        { id: "4", username: "QuickThink", wins: 119, totalGames: 170, winRate: 70.0 },
        { id: "5", username: "StrategicMind", wins: 115, totalGames: 165, winRate: 69.7 },
      ],
    };
  },

  getTopPlayers: async (): Promise<TopPlayer[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    return [
      { id: "1", username: "ProGamer123", wins: 456, totalGames: 600, winRate: 76.0 },
      { id: "2", username: "MathWiz", wins: 423, totalGames: 580, winRate: 72.9 },
      { id: "3", username: "NumberNinja", wins: 398, totalGames: 550, winRate: 72.4 },
      { id: "4", username: "QuickThink", wins: 367, totalGames: 520, winRate: 70.6 },
      { id: "5", username: "StrategicMind", wins: 345, totalGames: 500, winRate: 69.0 },
      { id: "6", username: "GameMaster", wins: 334, totalGames: 490, winRate: 68.2 },
      { id: "7", username: "BrainPower", wins: 298, totalGames: 450, winRate: 66.2 },
      { id: "8", username: "FastFingers", wins: 287, totalGames: 440, winRate: 65.2 },
      { id: "9", username: "ThinkFast", wins: 276, totalGames: 430, winRate: 64.2 },
      { id: "10", username: "NumberCruncher", wins: 265, totalGames: 420, winRate: 63.1 },
    ];
  },

  getTransactionOverview: async (): Promise<TransactionOverview> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      totalUserBalance: 306789.45,
      activeUsers: 892,
      userBalanceDistribution: {
        highBalance: 45,    // Users with $1000+
        mediumBalance: 234, // Users with $100-$999
        lowBalance: 513,    // Users with $1-$99
        noBalance: 455,     // Users with $0
      },
    };
  },
};

export const useAdminStats = () => {
  const adminStatsQuery = useQuery({
    queryKey: ["adminStats"],
    queryFn: api.getAdminStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  });

  const multiplayerStatsQuery = useQuery({
    queryKey: ["multiplayerStats"],
    queryFn: api.getMultiplayerStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 15 * 1000, // Refetch every 15 seconds
  });

  const topPlayersQuery = useQuery({
    queryKey: ["topPlayers"],
    queryFn: api.getTopPlayers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const transactionOverviewQuery = useQuery({
    queryKey: ["transactionOverview"],
    queryFn: api.getTransactionOverview,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    // Admin Stats
    adminStats: adminStatsQuery.data,
    isAdminStatsLoading: adminStatsQuery.isLoading,
    adminStatsError: adminStatsQuery.error,

    // Multiplayer Stats
    multiplayerStats: multiplayerStatsQuery.data,
    isMultiplayerStatsLoading: multiplayerStatsQuery.isLoading,
    multiplayerStatsError: multiplayerStatsQuery.error,

    // Top Players
    topPlayers: topPlayersQuery.data,
    isTopPlayersLoading: topPlayersQuery.isLoading,
    topPlayersError: topPlayersQuery.error,

    // Transaction Overview
    transactionOverview: transactionOverviewQuery.data,
    isTransactionOverviewLoading: transactionOverviewQuery.isLoading,
    transactionOverviewError: transactionOverviewQuery.error,

    // Aggregate loading state
    isStatsLoading: 
      adminStatsQuery.isLoading || 
      multiplayerStatsQuery.isLoading || 
      topPlayersQuery.isLoading ||
      transactionOverviewQuery.isLoading,

    // Refetch functions
    refetchAdminStats: adminStatsQuery.refetch,
    refetchMultiplayerStats: multiplayerStatsQuery.refetch,
    refetchTopPlayers: topPlayersQuery.refetch,
    refetchTransactionOverview: transactionOverviewQuery.refetch,
    refetchAllStats: () => {
      adminStatsQuery.refetch();
      multiplayerStatsQuery.refetch();
      topPlayersQuery.refetch();
      transactionOverviewQuery.refetch();
    },
  };
};