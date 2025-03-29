import type { Config } from "tailwindcss";

const config: Config = {
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
                    "0%": { bottom: "-100%" },
                    "100%": { bottom: "0%" },
                },
                slideBounceUp: {
                    "0%": { bottom: "-100%" },
                    "60%": { bottom: "0%" },
                    "75%": { bottom: "4%" },
                    "100%": { bottom: "0%" },
                },
                splashCurve: {
                    "0%": { bottom: "-100%" },
                    "60%": { bottom: "40%" },
                    "75%": { bottom: "44%" },
                    "85%": { bottom: "40%" },
                    "100%": { bottom: "100%" }, // đẩy hẳn lên ngoài màn hình
                },
            },
        },
    },
    plugins: [],
};
export default config;
