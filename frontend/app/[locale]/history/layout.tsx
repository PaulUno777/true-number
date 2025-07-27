'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>
    </div>
  );
}