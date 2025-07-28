import { useState, useCallback } from "react";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "success" | "error" | "warning" | "info" | "destructive";
  duration?: number;
}

interface Toast extends ToastOptions {
  id: string;
  timestamp: number;
}

let toastId = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((options: ToastOptions) => {
    const id = (++toastId).toString();
    const newToast: Toast = {
      ...options,
      id,
      timestamp: Date.now(),
      duration: options.duration || 5000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, newToast.duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toast,
    toasts,
    removeToast,
    clearAllToasts,
  };
};