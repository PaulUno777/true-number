"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { multiplayerService } from '@/services/multiplayer';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';

interface UseGameTimerProps {
  gameId: string | null;
  thinkingTime: number;
  currentTurnPlayerId: string | null;
  gameStatus: string;
  isMyTurn: boolean;
}

export const useGameTimer = ({
  gameId,
  thinkingTime,
  currentTurnPlayerId,
  gameStatus,
  isMyTurn,
}: UseGameTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const t = useTranslations('dashboard');

  const startTimer = useCallback(() => {
    if (gameStatus !== 'IN_PROGRESS' || !currentTurnPlayerId || !gameId) {
      return;
    }

    setTimeLeft(thinkingTime);
    setIsActive(true);
  }, [gameStatus, currentTurnPlayerId, gameId, thinkingTime]);

  const stopTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(null);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Public method to stop timer when player plays turn
  const stopTimerOnPlay = useCallback(() => {
    stopTimer();
  }, [stopTimer]);

  const handleTimeout = useCallback(async () => {
    if (!gameId || !isMyTurn) return;

    try {
      // Call REST API to forfeit by timeout
      await multiplayerService.forfeitByTimeout(gameId);
      
      toast.error(t('timeoutForfeit'), {
        duration: 6000,
        icon: '⏰',
      });
    } catch (error) {
      console.error('Error handling timeout:', error);
      toast.error('Error processing timeout forfeit');
    }
  }, [gameId, isMyTurn, t]);

  // Start timer when it's someone's turn
  useEffect(() => {
    if (gameStatus === 'IN_PROGRESS' && currentTurnPlayerId && gameId) {
      startTimer();
    } else {
      stopTimer();
    }

    return () => {
      stopTimer();
    };
  }, [gameStatus, currentTurnPlayerId, gameId, startTimer, stopTimer]);

  // Handle timer countdown
  useEffect(() => {
    if (isActive && timeLeft !== null) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 0) {
            setIsActive(false);
            // Only handle timeout if it's the current user's turn
            if (isMyTurn) {
              handleTimeout();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [isActive, timeLeft, isMyTurn, handleTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    stopTimerOnPlay,
  };
};