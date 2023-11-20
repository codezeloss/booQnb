import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/app/store/provider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "BooQnb",
  description:
    "BooQnb!! The best & the number one online marketplace for short/long-term homestays and experiences",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={nunito.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster />
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
