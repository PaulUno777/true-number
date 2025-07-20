'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gameService } from '@/services/game';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/providers/AuthProvider';
import { Trophy, Target, Zap, Crown, Star } from 'lucide-react';
import AchievementComponent from '@/components/ui/Achievement';
import { ACHIEVEMENTS } from '@/types/gamification';
import type { Achievement } from '@/types/gamification';

export default function AchievementsPage() {
  const { user } = useAuth();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const { data: history } = useQuery({
    queryKey: ['history'],
    queryFn: () => gameService.getHistory({ page: 1, size: 1000 }),
  });

  useEffect(() => {
    if (history?.data) {
      const totalGames = history.meta.totalCount;
      const wonGames = history.data.filter(game => game.result === 'WON').length;
      
      // Calculate streaks
      let longestStreak = 0;
      let tempStreak = 0;
      
      for (const game of history.data.reverse()) {
        if (game.result === 'WON') {
          tempStreak++;
          longestStreak = Math.max(longestStreak, tempStreak);
        } else {
          tempStreak = 0;
        }
      }

      const updatedAchievements = ACHIEVEMENTS.map(achievement => {
        let progress = 0;
        let unlocked = false;

        switch (achievement.category) {
          case 'games':
            progress = totalGames;
            break;
          case 'wins':
            progress = wonGames;
            break;
          case 'balance':
            progress = user?.balance || 0;
            break;
          case 'streak':
            progress = longestStreak;
            break;
          case 'special':
            if (achievement.id === 'lucky_number_7') {
              progress = history.data.some(game => game.generatedNumber === 7 || game.generatedNumber === 77) ? 1 : 0;
            } else if (achievement.id === 'perfect_50') {
              progress = history.data.some(game => game.generatedNumber === 50) ? 1 : 0;
            }
            break;
        }

        unlocked = progress >= achievement.requirement;
        
        return {
          ...achievement,
          progress,
          unlocked,
          unlockedAt: unlocked ? new Date() : undefined
        };
      });

      setAchievements(updatedAchievements);
    }
  }, [history, user?.balance]);

  const groupedAchievements = {
    wins: achievements.filter(a => a.category === 'wins'),
    games: achievements.filter(a => a.category === 'games'),
    balance: achievements.filter(a => a.category === 'balance'),
    streak: achievements.filter(a => a.category === 'streak'),
    special: achievements.filter(a => a.category === 'special'),
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wins': return <Trophy className="h-5 w-5" />;
      case 'games': return <Target className="h-5 w-5" />;
      case 'balance': return <Crown className="h-5 w-5" />;
      case 'streak': return <Zap className="h-5 w-5" />;
      case 'special': return <Star className="h-5 w-5" />;
      default: return <Trophy className="h-5 w-5" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'wins': return 'Victoires';
      case 'games': return 'Parties';
      case 'balance': return 'Fortune';
      case 'streak': return 'Séries';
      case 'special': return 'Spéciaux';
      default: return 'Succès';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold neon-text bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          🏆 Hall des Succès
        </h1>
        <p className="text-lg text-muted-foreground">
          Débloquez tous les trophées et devenez une légende!
        </p>
        
        {/* Progress Overview */}
        <div className="flex justify-center">
          <Card className="game-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{unlockedCount}</div>
                  <div className="text-sm text-muted-foreground">Débloqués</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">/{totalCount}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{completionPercentage}%</div>
                  <div className="text-sm text-muted-foreground">Complété</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="space-y-8">
        {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
          <Card key={category} className="game-card">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  {getCategoryIcon(category)}
                </div>
                <span>{getCategoryTitle(category)}</span>
                <span className="text-sm text-muted-foreground">
                  ({categoryAchievements.filter(a => a.unlocked).length}/{categoryAchievements.length})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categoryAchievements.map(achievement => (
                  <AchievementComponent
                    key={achievement.id}
                    achievement={achievement}
                    size="lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Rewards */}
      {completionPercentage === 100 && (
        <Card className="game-card border-4 border-accent pulse-glow">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">👑</div>
            <h2 className="text-3xl font-bold text-accent mb-2">
              MAÎTRE SUPRÊME!
            </h2>
            <p className="text-lg text-white">
              Félicitations! Vous avez débloqué tous les succès!
            </p>
            <p className="text-muted-foreground mt-2">
              Vous êtes maintenant une légende du TrueNumber! 🎉
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}