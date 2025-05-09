import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../style/globals.scss";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Huy Tran – Frontend Developer",
    description:
        "Hi, I'm Huy Tran – a frontend developer with 3 years of experience in building modern, responsive web interfaces using React and other cutting-edge technologies.",
    icons: {
        icon: "/profile/huy.jpg",
        shortcut: "/profile/huy.jpg",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
                    <LayoutContainer>{children}</LayoutContainer>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
