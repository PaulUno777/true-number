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
} from "lucide-react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { RechargeRequest } from "@/types/transaction";

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

  const handleRecharge = () => {
    if (amount < 1) {
      toast.error("Minimum recharge amount is $1");
      return;
    }
    
    if (amount > 10000) {
      toast.error("Maximum recharge amount is $10,000");
      return;
    }

    rechargeMutation.mutate({ amount });
  };

  const quickAmounts = [10, 25, 50, 100, 250, 500];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-gray-900/95 border-primary/30 animate-scale-in">
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

          {/* Payment Info */}
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
            <p className="text-xs text-blue-400 text-center">
              💳 Secure payment processing
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