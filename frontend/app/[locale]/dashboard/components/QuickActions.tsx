"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/Card";
import { Play, Loader2, Users } from "lucide-react";
import type { QuickActionsProps } from "../types/dashboard.types";

const QuickActions: React.FC<QuickActionsProps> = ({
  onJoinLastGame,
  onReconnectActiveGame,
  isLoadingJoinLast,
  isLoadingReconnect,
  t,
}) => {
  return (
    <Card className="game-card card-hover">
      <CardHeader>
        <CardTitle className="text-xl text-white flex items-center space-x-2">
          <Play className="h-5 w-5 text-accent" />
          <span>{t("quickActions", { defaultValue: "Quick Actions" })}</span>
        </CardTitle>
        <CardDescription>
          {t("quickActionsDescription", {
            defaultValue: "Quick access to common actions"
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={onJoinLastGame}
            isLoading={isLoadingJoinLast}
            disabled={isLoadingJoinLast || isLoadingReconnect}
            variant="outline"
            className="flex items-center space-x-2"
            aria-label={t("joinLastGame", { defaultValue: "Join your last created game" })}
            aria-describedby="join-last-description"
          >
            {isLoadingJoinLast ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            <span>
              {isLoadingJoinLast 
                ? t("joining", { defaultValue: "Joining..." })
                : t("joinLastGame", { defaultValue: "Join Last Game" })
              }
            </span>
          </Button>
          <Button
            onClick={onReconnectActiveGame}
            isLoading={isLoadingReconnect}
            disabled={isLoadingReconnect || isLoadingJoinLast}
            variant="outline"
            className="flex items-center space-x-2"
            aria-label={t("reconnectActive", { defaultValue: "Reconnect to active game" })}
            aria-describedby="reconnect-active-description"
          >
            {isLoadingReconnect ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            <span>
              {isLoadingReconnect 
                ? t("reconnecting", { defaultValue: "Reconnecting..." })
                : t("reconnectActive", { defaultValue: "Reconnect Active" })
              }
            </span>
          </Button>
        </div>
        
        {/* Hidden descriptions for screen readers */}
        <div className="sr-only">
          <p id="join-last-description">
            {t("joinLastDescription", {
              defaultValue: "Quickly rejoin your most recently created game if it's still waiting for players"
            })}
          </p>
          <p id="reconnect-active-description">
            {t("reconnectActiveDescription", {
              defaultValue: "Reconnect to any active game you're currently participating in"
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(QuickActions);