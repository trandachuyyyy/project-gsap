import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            animation: {
                slideUp: "slideUp 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
                "slide-bounce-up": "slideBounceUp 1.8s cubic-bezier(0.77, 0, 0.175, 1) forwards",
                "splash-curve": "splashCurve 2.5s cubic-bezier(0.77, 0, 0.175, 1) forwards",
            },
            keyframes: {
                slideUp: {
                    "0%": {
                        bottom: "-100%",
                    },
                    "100%": {
                        bottom: "0%",
                    },
                },
                slideBounceUp: {
                    "0%": {
                        bottom: "-100%",
                    },
                    "60%": {
                        bottom: "0%",
                    },
                    "75%": {
                        bottom: "4%",
                    },
                    "100%": {
                        bottom: "0%",
                    },
                },
                splashCurve: {
                    "0%": {
                        bottom: "-100%",
                    },
                    "60%": {
                        bottom: "40%",
                    },
                    "75%": {
                        bottom: "44%",
                    },
                    "85%": {
                        bottom: "40%",
                    },
                    "100%": {
                        bottom: "100%",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                "dark-bg": "#1f2937", // Ví dụ: Màu nền tối
                "dark-text": "#e5e7eb", // Ví dụ: Màu chữ sáng
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                chart: {
                    "1": "hsl(var(--chart-1))",
                    "2": "hsl(var(--chart-2))",
                    "3": "hsl(var(--chart-3))",
                    "4": "hsl(var(--chart-4))",
                    "5": "hsl(var(--chart-5))",
                },
            },
        },
    },
    plugins: [animate],
};
export default config;
