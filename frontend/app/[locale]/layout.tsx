import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import "../globals.css";

export const metadata: Metadata = {
  title: "TrueNumber Game",
  description:
    "A number guessing game where you try to guess if a number is above or below 50",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body>
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AuthProvider>
              <div className="min-h-screen bg-background relative">
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                  <Navbar />
                  {children}
                </main>
              </div>
              <Toaster position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
