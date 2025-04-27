import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.scss";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Huy Tran",
    description: "Huy Tran",
    icons: {
        icon: "/profile/huy.jpg",
        shortcut: "/profile/huy.jpg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <LayoutContainer>{children}</LayoutContainer>
                <Toaster />
            </body>
        </html>
    );
}
