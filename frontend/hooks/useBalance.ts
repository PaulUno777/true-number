import { useQuery } from '@tanstack/react-query';
import { transactionService } from '@/services/transaction';

export function useBalance() {
  const { data: balanceData, isLoading, error, refetch } = useQuery({
    queryKey: ['balance'],
    queryFn: transactionService.getBalance,
    staleTime: 30000, // 30 seconds
  });

  return {
    balance: balanceData?.balance ?? 0,
    isLoading,
    error,
    refetch,
  };
}