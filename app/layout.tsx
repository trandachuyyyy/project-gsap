import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.scss";
import LayoutContainer from "@/components/layout/LayoutContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next end Gsap",
  description: "Next end Gsap",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutContainer>
          {children}
        </LayoutContainer>
      </body>
    </html>
  );
}
