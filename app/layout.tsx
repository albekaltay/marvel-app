import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/layouts/layout";
import ReduxProvider from "@/redux/redux-provider";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Marvel App",
  description: "Marvel Comics, Series, Characters | Marvel App",
  icons: [{ rel: "icon", url: "/favicon/marvel-favicon.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReduxProvider>
          <Layout>
            {children}
            <Toaster />
          </Layout>
        </ReduxProvider>
      </body>
    </html>
  );
}
