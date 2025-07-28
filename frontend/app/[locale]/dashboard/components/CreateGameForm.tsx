"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/Card";
import { Plus } from "lucide-react";
import type { CreateGameFormProps } from "../types/dashboard.types";
import PenaltyWarning from "./PenaltyWarning";
import ConnectionStatus from "./ConnectionStatus";

const CreateGameForm: React.FC<CreateGameFormProps> = ({
  showCreateForm,
  createGameData,
  balance,
  onCreateGame,
  onToggleForm,
  onUpdateData,
  isLoading,
  t,
  socket,
}) => {
  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bet = parseInt(e.target.value) || 0;
    onUpdateData({ bet });
  };

  const handleThinkingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thinkingTime = parseInt(e.target.value) || 0;
    onUpdateData({ thinkingTime });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGame();
  };

  return (
    <Card className="game-card card-hover">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center justify-between">
          <span>{t("multiplayerGame", { defaultValue: "Multiplayer Game" })}</span>
          <div className="flex items-center space-x-3">
            <ConnectionStatus socket={socket} />
            <Button
              onClick={onToggleForm}
              variant="outline"
              size="sm"
              aria-expanded={showCreateForm}
              aria-controls="create-game-form"
            >
              <Plus className="h-4 w-4 mr-2" />
              {showCreateForm
                ? t("cancel", { defaultValue: "Cancel" })
                : t("createGame", { defaultValue: "Create Game" })}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      {showCreateForm && (
        <CardContent id="create-game-form" className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="bet-input"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("betPoints", { defaultValue: "Bet Points" })}
                </label>
                <Input
                  id="bet-input"
                  type="number"
                  min="1"
                  max="1000"
                  value={createGameData.bet}
                  onChange={handleBetChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  aria-describedby="bet-error"
                  required
                />
                {createGameData.bet > balance && (
                  <p id="bet-error" className="text-red-400 text-sm mt-1">
                    {t("insufficientBalance")}
                  </p>
                )}
              </div>
              <div>
                <label 
                  htmlFor="thinking-time-input"
                  className="block text-sm font-medium text-white mb-2"
                >
                  {t("thinkingTime", {
                    defaultValue: "Thinking Time (sec)",
                  })}
                </label>
                <Input
                  id="thinking-time-input"
                  type="number"
                  min="10"
                  max="300"
                  value={createGameData.thinkingTime}
                  onChange={handleThinkingTimeChange}
                  className="bg-gray-800 border-gray-600 text-white"
                  aria-describedby="thinking-time-error"
                  required
                />
                {(createGameData.thinkingTime < 10 || createGameData.thinkingTime > 300) && (
                  <p id="thinking-time-error" className="text-red-400 text-sm mt-1">
                    Thinking time must be between 10 and 300 seconds
                  </p>
                )}
              </div>
            </div>
            
            <PenaltyWarning t={t} />
            
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={createGameData.bet > balance || createGameData.bet < 1}
              className="w-full bg-primary hover:bg-primary-900"
              aria-describedby={createGameData.bet > balance ? "bet-error" : undefined}
            >
              {t("createGame", { defaultValue: "Create Game" })}
            </Button>
          </form>
        </CardContent>
      )}
    </Card>
  );
};

export default React.memo(CreateGameForm);