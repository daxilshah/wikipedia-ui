import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-virtualized/styles.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wikipedia",
  description: "Wikipedia Search Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
