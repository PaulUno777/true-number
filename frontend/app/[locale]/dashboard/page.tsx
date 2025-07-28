"use client";

import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { multiplayerService } from "@/services/multiplayer";
import { useBalance } from "@/hooks/useBalance";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useAuth } from "@/providers/AuthProvider";
import { DollarSign, CreditCard } from "lucide-react";
import { useTranslations } from "next-intl";
import Confetti from "@/components/ui/Confetti";
import GameModeSwitch from "@/components/GameModeSwitch";
import SoloGame from "@/components/SoloGame";
import RechargeModal from "@/components/RechargeModal";
import ClientOnlyBalance from "@/components/ClientOnlyBalance";
import PageLayout from "@/components/layout/PageLayout";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Import our new components
import CurrentGameCard from "./components/CurrentGameCard";
import CreateGameForm from "./components/CreateGameForm";
import WaitingGamesList from "./components/WaitingGamesList";
import QuickActions from "./components/QuickActions";

// Import our custom hooks
import { useGameReducer } from "./hooks/useGameReducer";
import { useGameMutations } from "./hooks/useGameMutations";
import { useGameValidation } from "./hooks/useGameValidation";
import { useSocketHandlers } from "./hooks/useSocketHandlers";
import { useSocket } from "@/hooks/useSocket";

import type {
  MultiplayerGame,
  TranslationFunction,
} from "./types/dashboard.types";

export default function GameDashboard() {
  const { user, refreshUser } = useAuth();
  const t = useTranslations("dashboard") as TranslationFunction;
  const [mounted, setMounted] = useState(false);

  // Use our custom reducer for state management
  const { state, dispatch } = useGameReducer();
  const { balance, isLoading: isLoadingBalance } = useBalance();

  // Use our custom validation hook
  const validation = useGameValidation(balance);

  // Initialize socket connection (single instance)
  const socket = useSocket();

  // Use our custom mutations hook
  const {
    createGameMutation,
    joinGameMutation,
    playTurnMutation,
    joinLastGameMutation,
    reconnectActiveGameMutation,
    leaveGameMutation,
  } = useGameMutations(socket);

  // Queries
  const { data: waitingGames, refetch: refetchWaitingGames } = useQuery({
    queryKey: ["waitingGames"],
    queryFn: multiplayerService.getWaitingGames,
  });

  // Helper function to trigger blinking
  const triggerBlink = useCallback(
    (elementId: string) => {
      dispatch({ type: "SET_BLINKING_ELEMENT", payload: elementId });
      setTimeout(
        () => dispatch({ type: "SET_BLINKING_ELEMENT", payload: null }),
        2000
      );
    },
    [dispatch]
  );

  // Use our socket handlers hook
  useSocketHandlers({
    socket,
    dispatch,
    refetchWaitingGames,
    refreshUser,
    user,
    triggerBlink,
  });

  // Timer effect
  useEffect(() => {
    if (state.gameTimer === null || state.gameTimer <= 0) return;

    const interval = setInterval(() => {
      dispatch({
        type: "SET_GAME_TIMER",
        payload: state.gameTimer ? state.gameTimer - 1 : 0,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state.gameTimer, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Action handlers
  const handleCreateGame = useCallback(() => {
    if (!validation.validateBetAmount(state.createGameData.bet)) {
      return;
    }

    createGameMutation.mutate(state.createGameData, {
      onSuccess: (data) => {
        dispatch({ type: "SET_CREATE_FORM", payload: false });
        dispatch({ type: "SET_SELECTED_GAME", payload: data.game });
        // Socket join would be handled in the mutation or through socket handlers
        refetchWaitingGames();
      },
    });
  }, [
    validation,
    state.createGameData,
    createGameMutation,
    dispatch,
    refetchWaitingGames,
  ]);

  const handleJoinGame = useCallback(
    (game: MultiplayerGame) => {
      if (!validation.validateGameJoin(game)) {
        return;
      }

      joinGameMutation.mutate(game.id, {
        onSuccess: (data) => {
          dispatch({ type: "SET_SELECTED_GAME", payload: data.game });
          refreshUser();
        },
      });
    },
    [validation, joinGameMutation, dispatch, refreshUser]
  );

  const handlePlayTurn = useCallback(() => {
    if (!state.selectedGame) return;

    playTurnMutation.mutate(state.selectedGame.id, {
      onSuccess: (data) => {
        dispatch({ type: "SET_SELECTED_GAME", payload: data.game });
        refreshUser();
      },
    });
  }, [state.selectedGame, playTurnMutation, dispatch, refreshUser]);

  const handleJoinLastGame = useCallback(() => {
    joinLastGameMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data?.game) {
          dispatch({ type: "SET_SELECTED_GAME", payload: data.game });
          // Socket join would be handled through socket handlers
        }
      },
    });
  }, [joinLastGameMutation, dispatch]);

  const handleReconnectActiveGame = useCallback(() => {
    reconnectActiveGameMutation.mutate(undefined, {
      onSuccess: (data) => {
        if (data?.game) {
          dispatch({ type: "SET_SELECTED_GAME", payload: data.game });
          // Socket join would be handled through socket handlers
        }
      },
    });
  }, [reconnectActiveGameMutation, dispatch]);

  const handleLeaveGame = useCallback(() => {
    if (!state.selectedGame) return;

    leaveGameMutation.mutate(state.selectedGame.id, {
      onSuccess: () => {
        // Socket leave would be handled in the mutation
        dispatch({ type: "SET_SELECTED_GAME", payload: null });
        refetchWaitingGames();
        refreshUser();
      },
    });
  }, [
    state.selectedGame,
    leaveGameMutation,
    dispatch,
    refetchWaitingGames,
    refreshUser,
  ]);

  const handleGameComplete = useCallback(() => {
    // This would be called from SoloGame component
    refreshUser();
  }, [refreshUser]);

  const handleToggleCreateForm = useCallback(() => {
    dispatch({ type: "TOGGLE_CREATE_FORM" });
  }, [dispatch]);

  const handleUpdateCreateGameData = useCallback(
    (data: Partial<typeof state.createGameData>) => {
      dispatch({ type: "UPDATE_CREATE_GAME_DATA", payload: data });
    },
    [state, dispatch]
  );

  const handleToggleRechargeModal = useCallback(() => {
    dispatch({ type: "TOGGLE_RECHARGE_MODAL" });
  }, [dispatch]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageLayout
      title={t("gameTitle", { defaultValue: "True Number Game" })}
      subtitle={t("gameSubtitle", {
        defaultValue: "Choose your mode and start playing!",
      })}
      breadcrumbs={[
        {
          label: t("gameDashboard", { defaultValue: "Game Dashboard" }),
          current: true,
        },
      ]}
    >
      <Confetti
        active={state.showConfetti}
        onComplete={() => dispatch({ type: "SET_CONFETTI", payload: false })}
      />

      {/* Balance Card */}
      <Card className="game-card card-hover">
        <CardContent className="p-6 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-6 w-6 text-green-400" />
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("currentBalance", { defaultValue: "Your Balance" })}
                </p>
                <ClientOnlyBalance className="text-3xl font-bold text-green-400" />
              </div>
            </div>
            <Button
              onClick={handleToggleRechargeModal}
              className="btn-primary flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <CreditCard className="h-4 w-4" />
              <span>{t("recharge", { defaultValue: "Recharge" })}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Mode Switch */}
      <GameModeSwitch
        defaultMode={state.gameMode}
        onModeChange={(mode) =>
          dispatch({ type: "SET_GAME_MODE", payload: mode })
        }
      />

      {/* Game Content */}
      {state.gameMode === "solo" ? (
        <SoloGame
          balance={isLoadingBalance ? 0 : balance}
          onGameComplete={handleGameComplete}
        />
      ) : (
        <div className="space-y-6">
          {/* Create Game Section */}
          <CreateGameForm
            showCreateForm={state.showCreateForm}
            createGameData={state.createGameData}
            balance={balance}
            onCreateGame={handleCreateGame}
            onToggleForm={handleToggleCreateForm}
            onUpdateData={handleUpdateCreateGameData}
            isLoading={createGameMutation.isPending}
            t={t}
            socket={socket}
          />

          {/* Quick Actions */}
          <QuickActions
            onJoinLastGame={handleJoinLastGame}
            onReconnectActiveGame={handleReconnectActiveGame}
            isLoadingJoinLast={joinLastGameMutation.isPending}
            isLoadingReconnect={reconnectActiveGameMutation.isPending}
            t={t}
          />

          {/* Current Game */}
          {state.selectedGame && (
            <CurrentGameCard
              selectedGame={state.selectedGame}
              user={user}
              gameTimer={state.gameTimer}
              blinkingElement={state.blinkingElement}
              onPlayTurn={handlePlayTurn}
              onLeaveGame={handleLeaveGame}
              isLoadingPlayTurn={playTurnMutation.isPending}
              isLoadingLeaveGame={leaveGameMutation.isPending}
              t={t}
            />
          )}

          {/* Waiting Games */}
          <WaitingGamesList
            waitingGames={waitingGames}
            user={user}
            balance={balance}
            onJoinGame={handleJoinGame}
            isLoadingJoin={joinGameMutation.isPending}
            isLoadingBalance={isLoadingBalance}
            t={t}
          />
        </div>
      )}

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={state.showRechargeModal}
        onClose={() => dispatch({ type: "SET_RECHARGE_MODAL", payload: false })}
        currentBalance={isLoadingBalance ? 0 : balance}
      />
    </PageLayout>
  );
}
