import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PlotFinder | Premium Land & Plot Marketplace",
  description: "Find the perfect land or plot in India with PlotFinder. Trustworthy and professional real estate marketplace.",
};

import { AuthProvider } from "@/context/AuthContext";
import ProtectRoute from "@/components/auth/ProtectRoute";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased`}
      >
        <AuthProvider>
          <ProtectRoute>
            {children}
          </ProtectRoute>
        </AuthProvider>
      </body>
    </html>
  );
}
