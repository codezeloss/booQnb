import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { ReduxProvider } from "@/app/store/provider";
import getCurrentUser from "@/app/actions/getCurrentUser";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  title: "BooQnb",
  description:
    "BooQnb!! The best & the number one online marketplace for short/long-term homestays and experiences",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

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
            <div className="w-full h-full min-h-screen flex flex-col justify-between">
              <Navbar currentUser={currentUser} />
              <div className="pt-28 pb-20">{children}</div>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ReduxProvider>
  );
}
