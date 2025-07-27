"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionService } from "@/services/transaction";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  DollarSign,
  CreditCard,
  Zap,
  X,
  Wallet,
  Building,
  Bitcoin,
} from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { RechargeRequest, PaymentMethod } from "@/types/transaction";

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBalance: number;
}

export default function RechargeModal({ 
  isOpen, 
  onClose, 
  currentBalance 
}: RechargeModalProps) {
  const queryClient = useQueryClient();
  const [amount, setAmount] = useState<number>(10);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CREDIT_CARD);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardholderName: '',
    paypalEmail: '',
    bankAccount: '',
    cryptoWallet: '',
  });

  const rechargeMutation = useMutation({
    mutationFn: (request: RechargeRequest) => transactionService.recharge(request),
    onSuccess: (data) => {
      toast.success(`Successfully recharged $${data.amount}!`, {
        duration: 5000,
        style: {
          background: "linear-gradient(45deg, #10b981, #059669)",
          color: "white",
        },
      });
      
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["transactionHistory"] });
      
      setAmount(10);
      setPaymentDetails({
        cardNumber: '',
        cardExpiry: '',
        cardCvv: '',
        cardholderName: '',
        paypalEmail: '',
        bankAccount: '',
        cryptoWallet: '',
      });
      onClose();
    },
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to recharge");
      } else {
        toast.error("Failed to recharge");
      }
    },
  });

  const validatePaymentDetails = (): boolean => {
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        if (!paymentDetails.cardNumber || !paymentDetails.cardExpiry || !paymentDetails.cardCvv || !paymentDetails.cardholderName) {
          toast.error("Please fill in all credit card details");
          return false;
        }
        break;
      case PaymentMethod.PAYPAL:
        if (!paymentDetails.paypalEmail) {
          toast.error("Please enter your PayPal email");
          return false;
        }
        break;
      case PaymentMethod.BANK_TRANSFER:
        if (!paymentDetails.bankAccount) {
          toast.error("Please enter your bank account number");
          return false;
        }
        break;
      case PaymentMethod.CRYPTO:
        if (!paymentDetails.cryptoWallet) {
          toast.error("Please enter your crypto wallet address");
          return false;
        }
        break;
    }
    return true;
  };

  const handleRecharge = () => {
    if (amount < 1) {
      toast.error("Minimum recharge amount is $1");
      return;
    }
    
    if (amount > 10000) {
      toast.error("Maximum recharge amount is $10,000");
      return;
    }

    if (!validatePaymentDetails()) {
      return;
    }

    const request: RechargeRequest = {
      amount,
      method: paymentMethod,
    };

    // Add payment-specific fields based on method
    switch (paymentMethod) {
      case PaymentMethod.CREDIT_CARD:
        request.cardNumber = paymentDetails.cardNumber;
        request.cardExpiry = paymentDetails.cardExpiry;
        request.cardCvv = paymentDetails.cardCvv;
        request.cardholderName = paymentDetails.cardholderName;
        break;
      case PaymentMethod.PAYPAL:
        request.paypalEmail = paymentDetails.paypalEmail;
        break;
      case PaymentMethod.BANK_TRANSFER:
        request.bankAccount = paymentDetails.bankAccount;
        break;
      case PaymentMethod.CRYPTO:
        request.cryptoWallet = paymentDetails.cryptoWallet;
        break;
    }

    rechargeMutation.mutate(request);
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900/95 border-primary/30 animate-scale-in">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="flex items-center space-x-2 text-white">
            <div className="relative">
              <CreditCard className="h-6 w-6 text-primary" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
            </div>
            <span>Recharge Balance</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Balance */}
          <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/30">
            <p className="text-sm text-white/70 mb-1">Current Balance</p>
            <p className="text-2xl font-bold text-white">${currentBalance}</p>
          </div>

          {/* Amount Input */}
          <div className="space-y-3">
            <label className="text-sm text-white font-medium">Recharge Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
              <Input
                type="number"
                min="1"
                max="10000"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                className="pl-10 bg-white/10 border-white/20 text-white text-center text-lg"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <p className="text-sm text-white/70">Quick amounts:</p>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount)}
                  className={`transition-all duration-200 hover:scale-105 active:scale-95 ${
                    amount === quickAmount
                      ? "border-green-500 bg-green-500/20 text-green-400 shadow-lg shadow-green-500/30"
                      : "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
                  }`}
                >
                  ${quickAmount}
                </Button>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <label className="text-sm text-white font-medium">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(PaymentMethod).map((method) => {
                const getMethodInfo = (method: PaymentMethod) => {
                  switch (method) {
                    case PaymentMethod.CREDIT_CARD:
                      return { icon: CreditCard, label: "Credit Card" };
                    case PaymentMethod.PAYPAL:
                      return { icon: Wallet, label: "PayPal" };
                    case PaymentMethod.BANK_TRANSFER:
                      return { icon: Building, label: "Bank Transfer" };
                    case PaymentMethod.CRYPTO:
                      return { icon: Bitcoin, label: "Crypto" };
                  }
                };
                
                const { icon: Icon, label } = getMethodInfo(method);
                
                return (
                  <Button
                    key={method}
                    variant="outline"
                    size="sm"
                    onClick={() => setPaymentMethod(method)}
                    className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 active:scale-95 ${
                      paymentMethod === method
                        ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/30"
                        : "border-white/30 text-white/70 hover:bg-white/10 hover:border-white/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-xs">{label}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Payment Details Form */}
          <div className="space-y-3">
            {paymentMethod === PaymentMethod.CREDIT_CARD && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <Input
                    type="text"
                    placeholder="Cardholder Name"
                    value={paymentDetails.cardholderName}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardholderName: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <Input
                    type="text"
                    placeholder="Card Number (e.g., 4111111111111111)"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                    className="bg-white/10 border-white/20 text-white"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentDetails.cardExpiry}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardExpiry: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                    <Input
                      type="text"
                      placeholder="CVV"
                      value={paymentDetails.cardCvv}
                      onChange={(e) => setPaymentDetails({...paymentDetails, cardCvv: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === PaymentMethod.PAYPAL && (
              <Input
                type="email"
                placeholder="PayPal Email"
                value={paymentDetails.paypalEmail}
                onChange={(e) => setPaymentDetails({...paymentDetails, paypalEmail: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            )}

            {paymentMethod === PaymentMethod.BANK_TRANSFER && (
              <Input
                type="text"
                placeholder="Bank Account Number"
                value={paymentDetails.bankAccount}
                onChange={(e) => setPaymentDetails({...paymentDetails, bankAccount: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            )}

            {paymentMethod === PaymentMethod.CRYPTO && (
              <Input
                type="text"
                placeholder="Crypto Wallet Address"
                value={paymentDetails.cryptoWallet}
                onChange={(e) => setPaymentDetails({...paymentDetails, cryptoWallet: e.target.value})}
                className="bg-white/10 border-white/20 text-white"
              />
            )}
          </div>

          {/* Payment Info */}
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <p className="text-xs text-blue-400 text-center">
              🔒 Secure payment processing - Demo mode
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/30 text-white/70 hover:bg-white/10"
              disabled={rechargeMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRecharge}
              isLoading={rechargeMutation.isPending}
              disabled={amount < 1 || rechargeMutation.isPending}
              className={`flex-1 btn-play relative overflow-hidden ${
                rechargeMutation.isPending 
                  ? "bg-gradient-to-r from-orange-500 to-red-500 animate-pulse cursor-not-allowed" 
                  : ""
              }`}
            >
              <div className="relative z-10 flex items-center justify-center">
                {rechargeMutation.isPending ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    <span>Recharge ${amount}</span>
                  </>
                )}
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}