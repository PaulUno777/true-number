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
          <span>{t("quickActions")}</span>
        </CardTitle>
        <CardDescription>{t("quickActionsDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={onJoinLastGame}
            isLoading={isLoadingJoinLast}
            variant="outline"
            className="flex items-center space-x-2"
            aria-label={t("joinLastGame")}
          >
            <Loader2 className="h-4 w-4" />
            <span>{t("joinLastGame")}</span>
          </Button>
          <Button
            onClick={onReconnectActiveGame}
            isLoading={isLoadingReconnect}
            variant="outline"
            className="flex items-center space-x-2"
            aria-label={t("reconnectActive")}
          >
            <Users className="h-4 w-4" />
            <span>{t("reconnectActive")}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(QuickActions);