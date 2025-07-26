// Transaction Types for balance and recharge functionality

export interface Balance {
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'recharge' | 'game_win' | 'game_loss';
  amount: number;
  description: string;
  createdAt: string;
}

export interface TransactionHistory {
  transactions: Transaction[];
  total: number;
}

export interface RechargeRequest {
  amount: number;
}

export interface RechargeResponse {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface RechargeHistory {
  recharges: RechargeResponse[];
  total: number;
}