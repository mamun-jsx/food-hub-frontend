import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FoodHub | Artisanal Culinary Experience",
  description: "Your premier destination for artisanal culinary experiences.",
  icons: {
    icon: "/favIcon.png",
  },
};

import { CartProvider } from "@/context/CartContext";
import { Toaster } from "react-hot-toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import TanstackProvider from "@/providers/TanstackProvider";
import ChatAssistant from "@/components/shared/ChatAssistant";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TanstackProvider>
          <TooltipProvider>
            <CartProvider>
              <Toaster position="top-right" />
              <ChatAssistant />
              {children}
            </CartProvider>
          </TooltipProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
