import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WrapMain } from "@/styles/wrapper";
import { Providers } from "@/app/providers";
import { WindowResize } from "@/components/WindowResize";
import { ApiErrors } from "@/components/ApiErrors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ICONYAKI",
  description: "Elevating Icon Transformation Experience for Frontend Developers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <ApiErrors />
          <WrapMain>{children}</WrapMain>
        </Providers>
        <WindowResize />
      </body>
    </html>
  );
}
