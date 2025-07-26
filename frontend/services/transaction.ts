import { api } from './api';
import {
  Balance,
  TransactionHistory,
  RechargeRequest,
  RechargeResponse,
  RechargeHistory,
} from '@/types/transaction';

class TransactionService {
  async getBalance(): Promise<Balance> {
    const response = await api.get<Balance>('/transaction/balance');
    return response.data;
  }

  async getHistory(): Promise<TransactionHistory> {
    const response = await api.get<TransactionHistory>('/transaction/history');
    return response.data;
  }

  async recharge(request: RechargeRequest): Promise<RechargeResponse> {
    const response = await api.post<RechargeResponse>('/transaction/recharge', request);
    return response.data;
  }

  async getRechargeHistory(): Promise<RechargeHistory> {
    const response = await api.get<RechargeHistory>('/transaction/recharge/history');
    return response.data;
  }
}

export const transactionService = new TransactionService();