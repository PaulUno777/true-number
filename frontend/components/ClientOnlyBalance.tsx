"use client";

import { useEffect, useState } from "react";
import { useBalance } from "@/hooks/useBalance";

interface ClientOnlyBalanceProps {
  className?: string;
}

export default function ClientOnlyBalance({ className }: ClientOnlyBalanceProps) {
  const [mounted, setMounted] = useState(false);
  const { balance, isLoading } = useBalance();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className={className}>Loading...</span>;
  }

  if (isLoading) {
    return <span className={className}>Loading...</span>;
  }

  return <span className={className}>{balance}</span>;
}