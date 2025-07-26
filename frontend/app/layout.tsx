import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/QueryProvider";
import AuthProvider from "@/providers/AuthProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrueNumber Game",
  description:
    "A number guessing game where you try to guess if a number is above or below 70",
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  console.log('Layout locale:', locale);
  
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="dark">
      <body className="dark bg-gray-900 text-white">
        <NextIntlClientProvider messages={messages}>
          <QueryProvider>
            <AuthProvider>
              {children}
              <Toaster position="top-right" />
            </AuthProvider>
          </QueryProvider>
        </NextIntlClientProvider>
        </body>
    </html>
  );
}
