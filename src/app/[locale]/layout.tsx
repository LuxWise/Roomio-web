import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import "../globals.css";
import { HotelProvider } from "@/context/HotelContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roomio",
  description: "Your hotel assistant",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <AuthProvider>
          <HotelProvider>
            <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </GoogleOAuthProvider>
          </HotelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
