import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/context/query-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s | hill cross",
    default: "hill cross"
  },
  description: "HillCross College Student Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <QueryProvider>
          
          {children}
          <Toaster />
        </QueryProvider>
        
      </body>
    </html>
  );
}
