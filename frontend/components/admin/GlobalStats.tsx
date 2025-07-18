'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Gamepad2, Trophy, TrendingUp, Crown, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useGlobalStats } from '@/hooks/useGlobalStats';

export function GlobalStats() {
  const t = useTranslations('admin');
  const tGame = useTranslations('game');
  const { data: stats, isLoading } = useGlobalStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: t('totalUsers'),
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'text-info',
    },
    {
      title: tGame('totalGames'),
      value: stats?.totalGames || 0,
      icon: Gamepad2,
      color: 'text-primary',
    },
    {
      title: tGame('gamesWon'),
      value: stats?.wonGames || 0,
      icon: Trophy,
      color: 'text-success',
    },
    {
      title: tGame('gamesLost'),
      value: stats?.lostGames || 0,
      icon: Target,
      color: 'text-destructive',
    },
    {
      title: 'Global Win Rate',
      value: `${Math.round((stats?.globalWinRate || 0) * 100) / 100}%`,
      icon: TrendingUp,
      color: 'text-warning',
    },
    {
      title: 'Average Balance',
      value: Math.round(stats?.averageBalance || 0),
      icon: Crown,
      color: 'text-secondary-foreground',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <TrendingUp className="h-6 w-6" />
        {t('globalStats')}
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="gradient">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Players */}
      {stats?.topPlayers && stats.topPlayers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-warning" />
              {t('topPlayers')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topPlayers.slice(0, 10).map((player: any, index: number) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{player.username}</div>
                      <div className="text-sm text-muted-foreground">
                        {player._count.gameHistory} games played
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {player.balance} pts
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}