"use client";

import { useQuery } from "@tanstack/react-query";
import { transactionService } from "@/services/transaction";
import SoloGame from "@/components/SoloGame";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useRouter } from "@/i18n/routing";
import { 
  Home, 
  Users, 
  Dice1, 
  TrendingUp,
  DollarSign,
  ArrowLeft 
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function SoloDashboard() {
  const router = useRouter();
  const t = useTranslations("solo");

  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: transactionService.getBalance,
  });

  const handleGameComplete = () => {
    refetchBalance();
  };

  return (
    <div className="space-y-8 relative">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Solo Number Game
        </h1>
        <p className="text-lg text-muted-foreground">
          Test your luck and strategy against the random number generator!
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <button
          onClick={() => router.push("/dashboard")}
          className="hover:text-primary transition-colors flex items-center space-x-1"
        >
          <Home className="h-3 w-3" />
          <span>Dashboard</span>
        </button>
        <span>/</span>
        <span className="text-white">Solo Game</span>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Current Balance
            </CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400">
              ${balance?.balance || 0}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Available to play
            </p>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Game Mode
            </CardTitle>
            <Dice1 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              Solo
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Single player mode
            </p>
          </CardContent>
        </Card>

        <Card className="game-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Max Win
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">
              2x
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Exact match multiplier
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Actions */}
      <Card className="game-card">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5 text-accent" />
            <span>Quick Navigation</span>
          </CardTitle>
          <CardDescription>
            Explore other game modes and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="flex items-center space-x-2 h-16 border-primary/50 text-primary hover:bg-primary/10"
            >
              <Users className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Multiplayer Games</div>
                <div className="text-xs opacity-70">Challenge other players</div>
              </div>
            </Button>
            <Button
              onClick={() => router.push("/history")}
              variant="outline"
              className="flex items-center space-x-2 h-16 border-accent/50 text-accent hover:bg-accent/10"
            >
              <TrendingUp className="h-6 w-6" />
              <div className="text-left">
                <div className="font-semibold">Game History</div>
                <div className="text-xs opacity-70">View past games</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Solo Game Component */}
      <SoloGame 
        balance={balance?.balance || 0} 
        onGameComplete={handleGameComplete}
      />
    </div>
  );
}