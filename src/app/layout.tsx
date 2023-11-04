import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WrapMain } from "@/styles/wrapper";
import { Providers } from "@/app/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IconYaki",
  description: "React Icon Generator",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <WrapMain>{children}</WrapMain>
        </Providers>
      </body>
    </html>
  );
}
