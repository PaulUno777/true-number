// Transaction Types for balance and recharge functionality

export interface Balance {
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  reference?: string;
  status: string;
  createdAt: string;
  balanceAfter?: number;
}

export interface TransactionHistory {
  transactions: Transaction[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  message?: string;
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CRYPTO = 'CRYPTO',
}

export interface RechargeRequest {
  amount: number;
  method: PaymentMethod;
  // Credit card fields
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  cardholderName?: string;
  // PayPal field
  paypalEmail?: string;
  // Bank transfer field
  bankAccount?: string;
  // Crypto field
  cryptoWallet?: string;
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