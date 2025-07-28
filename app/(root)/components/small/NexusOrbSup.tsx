"use client";
import React, { useState, useEffect, useRef, ReactNode, useMemo, useCallback } from "react";

// Type definitions
interface IconWrapperProps {
    children: ReactNode;
    className?: string;
    isHighlighted?: boolean;
    isActive?: boolean;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
}

interface IconPosition {
    transformX: number;
    transformY: number;
    svgX: number;
    svgY: number;
}

interface OuterIcon {
    id: number;
    component: ReactNode;
}

// SVG Icon Components (cleaned up and optimized)
const SparkleIcon = () => (
    <svg
        height="1.8em"
        style={{ flex: "none", lineHeight: 1 }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width="1.8em"
    >
        <title>Gemini</title>
        <defs>
            <linearGradient id="gemini-gradient-fixed" x1="0%" x2="68.73%" y1="100%" y2="30.395%">
                <stop offset="0%" stopColor="#1C7DFF"></stop>
                <stop offset="52.021%" stopColor="#1C69FF"></stop>
                <stop offset="100%" stopColor="#F0DCD6"></stop>
            </linearGradient>
        </defs>
        <path
            d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12"
            fill="url(#gemini-gradient-fixed)"
            fillRule="nonzero"
        ></path>
    </svg>
);

const FigmaIcon = () => (
    <svg width="1.8em" height="1.8em" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0 1.5C0 0.671573 0.671573 0 1.5 0H8.5C9.32843 0 10 0.671573 10 1.5V8H1.5C0.671573 8 0 7.32843 0 6.5V1.5Z"
            fill="#F26207"
        ></path>
        <path d="M10 8H18.5C19.3284 8 20 8.67157 20 9.5V14.5C20 15.3284 19.3284 16 18.5 16H10V8Z" fill="#F26207"></path>
        <path
            d="M0 17.5C0 16.6716 0.671573 16 1.5 16H10V22.5C10 23.3284 9.32843 24 8.5 24H1.5C0.671573 24 0 23.3284 0 22.5V17.5Z"
            fill="#F26207"
        ></path>
    </svg>
);

const CoralIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="1.8em" height="1.8em">
        <defs>
            <linearGradient
                id="coral-gradient-fixed"
                x1="199.997"
                x2="296.665"
                y1="214.302"
                y2="307.573"
                gradientTransform="translate(-200 -213)"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0" stopColor="#62A0EA"></stop>
                <stop offset="1" stopColor="#1A5FB4"></stop>
            </linearGradient>
        </defs>
        <path
            fill="url(#coral-gradient-fixed)"
            d="M48.26 2.274a6.113 6.113 0 0 0-1.838 8.468c10.109 15.655 12.495 27.463 11.46 37.811-4.184 19.816-13.279 23.836-21.227 23.836-7.76 0-5.682-12.771.151-16.509 3.482-2.174 7.942-3.587 11.365-3.587 3.392 0 6.142-2.741 6.142-6.123 0-3.383-2.75-6.124-6.142-6.124-3.998 0-7.92.84-11.581 2.27.748-3.529 1.024-7.343.057-11.397-1.468-6.156-5.694-12.036-13.032-17.736a6.15 6.15 0 0 0-8.621 1.065 6.114 6.114 0 0 0 1.078 8.595c5.978 4.643 7.952 8.08 8.627 10.909.675 2.829.132 5.864-1.224 10.034-1.733 5.62-3.745 10.637-4.627 15.448-.434 2.368-.471 4.945-.583 7.004-4.305-4.196-5.99-9.736-5.99-17.831-.001-3.382-2.751-6.124-6.142-6.123-3.389.003-6.135 2.743-6.136 6.123 0 11.056 3.233 21.576 11.898 28.594 7.844 7.473 27.791 4.711 27.791 16.708 0 3.386 4.956 5.034 8.347 5.034 3.478 0 7.855-2.325 7.855-5.034 0-13.612 14.345-21.885 37.96-21.849 3.392.005 6.144-2.734 6.149-6.116.006-3.383-2.738-6.13-6.13-6.136a78.226 78.226 0 0 0-4.741.145c2.64-6.209 3.811-13.045 3.569-20.429-.112-3.381-2.95-6.031-6.339-5.921-3.393.11-6.051 2.943-5.94 6.326.32 9.668-.042 18.301-7.245 22.852-2.048 1.293-4.429 2.415-6.687 2.415 1.753-4.768 3.077-9.801 3.619-15.226.346-3.462.383-7.575-.012-10.77-.613-4.95-1.353-10.564.526-14.793 1.688-3.642 5.47-5.167 11.023-5.167 3.389-.003 6.135-2.744 6.136-6.123.002-3.383-2.745-6.127-6.136-6.13-8.252 0-14.507 4.343-18.053 9.59-1.854-3.96-4.112-8.041-6.84-12.265a6.14 6.14 0 0 0-3.86-2.669 6.159 6.159 0 0 0-4.627.831z"
        ></path>
    </svg>
);

const PalmTreeIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.8em"
        height="1.8em"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 229"
    >
        <path
            fill="#F9AB00"
            d="M128 228.542c9.895 0 17.91-8.015 17.91-17.91V55.413h-35.82v155.219c0 9.895 8.015 17.91 17.91 17.91Z"
        ></path>
        <path
            fill="#5BB974"
            d="M199.356 112.053C180.043 92.755 151.193 88.845 128 100.307l76.669 76.67c3.164 3.163 8.612 1.91 9.955-2.344 6.746-21.357 1.657-45.64-15.268-62.58Z"
        ></path>
        <path
            fill="#129EAF"
            d="M56.644 112.053C75.957 92.755 104.807 88.845 128 100.307l-76.669 76.67c-3.164 3.163-8.612 1.91-9.955-2.344-6.746-21.357-1.657-45.64 15.268-62.58Z"
        ></path>
        <path
            fill="#AF5CF7"
            d="M193.67 52.548c-30.507 0-56.402 20-65.67 47.76h121.25c4.97 0 8.283-5.254 6.03-9.687-11.523-22.611-34.776-38.073-61.61-38.073Z"
        ></path>
        <path
            fill="#FF8BCB"
            d="M140.671 20.101C119.09 41.682 114.926 74.114 128 100.307l85.743-85.743c3.523-3.522 2.15-9.582-2.582-11.119-24.148-7.836-51.52-2.313-70.49 16.656Z"
        ></path>
        <path
            fill="#FA7B17"
            d="M115.329 20.101C136.91 41.682 141.074 74.114 128 100.307L42.257 14.564c-3.523-3.522-2.15-9.582 2.582-11.119 24.148-7.836 51.52-2.313 70.49 16.656Z"
        ></path>
        <path
            fill="#4285F4"
            d="M62.33 52.548c30.507 0 56.402 20 65.67 47.76H6.75c-4.97 0-8.283-5.254-6.03-9.687C12.244 68.01 35.497 52.548 62.33 52.548Z"
        ></path>
    </svg>
);

const FlowerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="1.8em" height="1.8em">
        <defs>
            <linearGradient id="gradient-flower-fixed" x1="0" x2="100" y1="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0a00b2"></stop>
                <stop offset="50%" stopColor="red"></stop>
                <stop offset="100%" stopColor="#fffc00"></stop>
            </linearGradient>
        </defs>
        <g fill="url(#gradient-flower-fixed)" transform="matrix(.5 0 0 .5 0 .026)">
            <path
                d="M33.6 14.8a16.938 16.938 0 0 0 3.116 11.142 11.457 11.457 0 0 0 6.858 4.3 3.033 3.033 0 0 0 2.385-.713 11.924 11.924 0 0 0 3.634-10.837c-1.257-7.54-6.19-12.43-12.4-17A32.468 32.468 0 0 0 33.6 14.8z"
                opacity="0.65"
            ></path>
            <path
                d="M25.117 20.232a16.938 16.938 0 0 0 5.893 9.956 11.457 11.457 0 0 0 7.738 2.381 3.033 3.033 0 0 0 2.119-1.306 11.924 11.924 0 0 0 .705-11.409C38.406 12.9 32.376 9.449 25.2 6.642a32.468 32.468 0 0 0-.083 13.59z"
                opacity="0.65"
            ></path>
            <path
                d="M18.329 27.677a16.937 16.937 0 0 0 8.271 8.092 11.457 11.457 0 0 0 8.09.3 3.033 3.033 0 0 0 1.709-1.81 11.924 11.924 0 0 0-2.271-11.2c-4.859-5.9-11.576-7.67-19.237-8.523a32.466 32.466 0 0 0 3.438 13.141z"
                opacity="0.65"
            ></path>
            <path
                d="M13.7 36.626A16.938 16.938 0 0 0 23.781 42.3a11.457 11.457 0 0 0 7.891-1.807 3.033 3.033 0 0 0 1.182-2.193 11.924 11.924 0 0 0-5.093-10.233c-6.221-4.443-13.167-4.412-20.787-3.254A32.468 32.468 0 0 0 13.7 36.626z"
                opacity="0.65"
            ></path>
            <path
                d="M11.543 46.468a16.938 16.938 0 0 0 11.208 2.873 11.457 11.457 0 0 0 7.155-3.788 3.034 3.034 0 0 0 .575-2.422 11.924 11.924 0 0 0-7.568-8.566c-7.16-2.681-13.861-.854-20.923 2.235a32.468 32.468 0 0 0 9.553 9.668z"
                opacity="0.65"
            ></path>
            <path
                d="M12.008 56.532a16.938 16.938 0 0 0 11.569-.126 11.457 11.457 0 0 0 5.931-5.51 3.033 3.033 0 0 0-.072-2.488 11.924 11.924 0 0 0-9.527-6.315C12.3 41.356 6.3 44.855.279 49.669a32.467 32.467 0 0 0 11.729 6.863z"
                opacity="0.65"
            ></path>
            <path
                d="M15.062 66.134A16.938 16.938 0 0 0 26.2 63.018a11.457 11.457 0 0 0 4.3-6.858 3.033 3.033 0 0 0-.713-2.385 11.924 11.924 0 0 0-10.837-3.634c-7.54 1.257-12.43 6.19-17 12.4a32.468 32.468 0 0 0 13.112 3.593z"
                opacity="0.65"
            ></path>
            <path
                d="M20.5 74.618a16.938 16.938 0 0 0 9.956-5.893 11.457 11.457 0 0 0 2.381-7.738 3.033 3.033 0 0 0-1.306-2.119 11.925 11.925 0 0 0-11.409-.705c-6.958 3.166-10.4 9.2-13.212 16.376a32.466 32.466 0 0 0 13.59.079z"
                opacity="0.65"
            ></path>
            <path
                d="M27.943 81.406a16.938 16.938 0 0 0 8.092-8.269 11.457 11.457 0 0 0 .3-8.09 3.033 3.033 0 0 0-1.81-1.709 11.924 11.924 0 0 0-11.2 2.271c-5.9 4.859-7.67 11.576-8.523 19.237a32.467 32.467 0 0 0 13.141-3.44z"
                opacity="0.65"
            ></path>
            <path
                d="M36.891 86.035a16.938 16.938 0 0 0 5.676-10.082 11.457 11.457 0 0 0-1.807-7.891 3.033 3.033 0 0 0-2.191-1.182 11.924 11.924 0 0 0-10.233 5.094c-4.443 6.221-4.412 13.167-3.254 20.787a32.467 32.467 0 0 0 11.809-6.726z"
                opacity="0.65"
            ></path>
            <path
                d="M46.733 88.191a16.937 16.937 0 0 0 2.873-11.207 11.457 11.457 0 0 0-3.788-7.155 3.033 3.033 0 0 0-2.422-.575 11.924 11.924 0 0 0-8.566 7.568c-2.681 7.159-.854 13.86 2.237 20.921a32.465 32.465 0 0 0 9.666-9.552z"
                opacity="0.65"
            ></path>
            <path
                d="M56.8 87.726a16.937 16.937 0 0 0-.125-11.569 11.457 11.457 0 0 0-5.511-5.931 3.033 3.033 0 0 0-2.488.072 11.924 11.924 0 0 0-6.315 9.528c-.737 7.609 2.762 13.609 7.576 19.629A32.466 32.466 0 0 0 56.8 87.726z"
                opacity="0.65"
            ></path>
            <path
                d="M66.4 84.672a16.938 16.938 0 0 0-3.116-11.142 11.457 11.457 0 0 0-6.858-4.3 3.033 3.033 0 0 0-2.385.713 11.924 11.924 0 0 0-3.634 10.837c1.257 7.54 6.19 12.43 12.4 17A32.468 32.468 0 0 0 66.4 84.672z"
                opacity="0.65"
            ></path>
            <path
                d="M74.883 79.237a16.937 16.937 0 0 0-5.893-9.956 11.456 11.456 0 0 0-7.738-2.381 3.033 3.033 0 0 0-2.119 1.306 11.924 11.924 0 0 0-.705 11.409c3.166 6.958 9.2 10.4 16.375 13.212a32.468 32.468 0 0 0 .08-13.59z"
                opacity="0.65"
            ></path>
            <path
                d="M81.671 71.792A16.938 16.938 0 0 0 73.4 63.7a11.457 11.457 0 0 0-8.09-.3 3.033 3.033 0 0 0-1.708 1.81 11.924 11.924 0 0 0 2.271 11.2c4.859 5.9 11.576 7.67 19.237 8.523a32.466 32.466 0 0 0-3.439-13.141z"
                opacity="0.65"
            ></path>
            <path
                d="M86.3 62.843a16.938 16.938 0 0 0-10.082-5.676 11.457 11.457 0 0 0-7.891 1.807 3.033 3.033 0 0 0-1.182 2.191A11.924 11.924 0 0 0 72.239 71.4c6.221 4.443 13.167 4.412 20.787 3.254A32.467 32.467 0 0 0 86.3 62.843z"
                opacity="0.65"
            ></path>
            <path
                d="M88.457 53a16.938 16.938 0 0 0-11.207-2.873 11.457 11.457 0 0 0-7.155 3.788 3.033 3.033 0 0 0-.574 2.422 11.925 11.925 0 0 0 7.567 8.563c7.158 2.681 13.86.854 20.921-2.237A32.467 32.467 0 0 0 88.457 53z"
                opacity="0.65"
            ></path>
            <path
                d="M87.992 42.936a16.938 16.938 0 0 0-11.569.126 11.457 11.457 0 0 0-5.931 5.511 3.033 3.033 0 0 0 .072 2.488 11.924 11.924 0 0 0 9.527 6.315c7.609.737 13.609-2.762 19.63-7.576a32.468 32.468 0 0 0-11.729-6.864z"
                opacity="0.65"
            ></path>
            <path
                d="M84.938 33.335A16.938 16.938 0 0 0 73.8 36.451a11.457 11.457 0 0 0-4.3 6.858 3.033 3.033 0 0 0 .714 2.385 11.924 11.924 0 0 0 10.837 3.634c7.54-1.257 12.43-6.19 17-12.4a32.466 32.466 0 0 0-13.113-3.593z"
                opacity="0.65"
            ></path>
            <path
                d="M79.5 24.851a16.938 16.938 0 0 0-9.956 5.893 11.457 11.457 0 0 0-2.381 7.738 3.033 3.033 0 0 0 1.309 2.118 11.924 11.924 0 0 0 11.409.705c6.958-3.166 10.4-9.2 13.212-16.375a32.468 32.468 0 0 0-13.593-.079z"
                opacity="0.65"
            ></path>
            <path
                d="M72.057 18.063a16.938 16.938 0 0 0-8.092 8.269 11.457 11.457 0 0 0-.3 8.09 3.033 3.033 0 0 0 1.81 1.709 11.924 11.924 0 0 0 11.2-2.271c5.9-4.859 7.67-11.576 8.523-19.237a32.467 32.467 0 0 0-13.141 3.44z"
                opacity="0.65"
            ></path>
            <path
                d="M63.109 13.434a16.937 16.937 0 0 0-5.676 10.082 11.457 11.457 0 0 0 1.807 7.891 3.033 3.033 0 0 0 2.191 1.182A11.924 11.924 0 0 0 71.664 27.5c4.443-6.221 4.412-13.167 3.254-20.787a32.466 32.466 0 0 0-11.809 6.721z"
                opacity="0.65"
            ></path>
            <path
                d="M53.267 11.278a16.937 16.937 0 0 0-2.873 11.207 11.456 11.456 0 0 0 3.788 7.155 3.033 3.033 0 0 0 2.422.575 11.924 11.924 0 0 0 8.566-7.568c2.681-7.159-.854-13.86-2.237-20.921a32.466 32.466 0 0 0-9.666 9.552z"
                opacity="0.65"
            ></path>
            <path
                d="M43.2 11.743a16.938 16.938 0 0 0 .126 11.569 11.457 11.457 0 0 0 5.511 5.931 3.033 3.033 0 0 0 2.488-.072 11.924 11.924 0 0 0 6.315-9.528c.739-7.609-2.76-13.609-7.574-19.629A32.468 32.468 0 0 0 43.2 11.743z"
                opacity="0.65"
            ></path>
        </g>
    </svg>
);

const PerplexityIcon = () => (
    <svg width="1.8em" height="1.8em" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient
                id="paint0_linear_601_4643-fixed"
                x1="128"
                y1="0"
                x2="128"
                y2="256"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#EF786F"></stop>
                <stop offset="1" stopColor="#D8595E"></stop>
            </linearGradient>
            <linearGradient
                id="paint1_linear_601_4643-fixed"
                x1="78"
                y1="0.0000037012"
                x2="236"
                y2="256"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#9E7AFF"></stop>
                <stop offset="0.333333" stopColor="#FE8BBB"></stop>
                <stop offset="0.666667" stopColor="#FFBD7A"></stop>
                <stop offset="1" stopColor="#F8EAC3"></stop>
            </linearGradient>
        </defs>
        <rect width="256" height="256" rx="128" fill="url(#paint0_linear_601_4643-fixed)"></rect>
        <rect width="256" height="256" rx="128" fill="url(#paint1_linear_601_4643-fixed)"></rect>
        <path
            d="M124.157 193.675C123.939 193.783 123.722 193.837 123.505 193.837C123.287 193.837 122.852 193.837 122.2 193.837C120.678 193.837 118.884 193.567 116.818 193.025C114.862 192.591 112.905 191.995 110.948 191.236C109.099 190.586 107.469 189.828 106.055 188.961C104.751 188.094 103.935 187.335 103.609 186.685C103.501 185.167 103.446 183.596 103.446 181.97C103.446 180.345 103.446 178.773 103.446 177.256C103.446 165.118 104.316 152.438 106.055 139.217C107.904 125.995 110.893 111.69 115.025 96.3005C115.459 94.7833 115.894 92.8867 116.329 90.6108C116.873 88.2266 117.416 85.6798 117.96 82.9704C115.351 85.0296 112.252 88.335 108.665 92.8867C105.077 97.3301 101.272 102.64 97.2492 108.818C93.3354 114.887 89.3672 121.606 85.3446 128.975C81.4308 136.236 77.8431 143.66 74.5815 151.246C71.32 158.724 68.4933 166.148 66.1015 173.517C63.8185 180.887 62.4051 187.714 61.8615 194C56.6431 192.483 53.001 190.966 50.9354 189.448C48.9785 187.931 48 186.089 48 183.921C48 181.97 48.5979 179.207 49.7938 175.631C50.9897 172.054 52.6749 167.828 54.8492 162.951C57.0236 158.074 59.6872 152.655 62.84 146.695C65.9928 140.626 69.4718 134.123 73.2769 127.187C77.6256 119.276 81.8656 111.852 85.9969 104.916C90.2369 97.9803 94.3682 91.6946 98.3908 86.0591C102.413 80.4236 106.327 75.5468 110.132 71.4286C114.046 67.3104 117.906 64.1675 121.711 62C123.233 62 125.244 62.3793 127.745 63.1379C130.354 63.8966 132.854 64.8177 135.246 65.9015C137.747 66.9852 139.921 68.1232 141.769 69.3153C143.726 70.399 144.813 71.3202 145.031 72.0788C143.509 75.1133 141.715 79.665 139.649 85.734C137.584 91.803 135.464 98.6847 133.289 106.379C131.224 114.074 129.212 122.256 127.255 130.926C125.407 139.488 123.939 147.724 122.852 155.635C125.353 149.675 128.234 143.498 131.495 137.103C134.866 130.601 138.399 124.207 142.095 117.921C145.792 111.527 149.543 105.35 153.348 99.3892C157.262 93.4286 161.067 88.0099 164.763 83.133C168.459 78.1478 171.884 73.8128 175.037 70.1281C178.298 66.4434 181.179 63.734 183.68 62C185.202 62 187.213 62.3793 189.714 63.1379C192.323 63.8966 194.824 64.8177 197.215 65.9015C199.716 66.9852 201.89 68.1232 203.738 69.3153C205.695 70.399 206.783 71.3202 207 72.0788C203.521 78.2562 200.477 85.7882 197.868 94.6749C195.258 103.562 193.03 112.882 191.182 122.635C189.442 132.389 188.083 142.089 187.105 151.734C186.235 161.271 185.8 169.833 185.8 177.419C185.8 179.911 185.8 182.512 185.8 185.222C185.8 187.931 185.909 190.749 186.126 193.675C184.604 193.675 182.756 193.458 180.582 193.025C178.516 192.7 176.45 192.212 174.385 191.562C172.428 190.911 170.634 190.153 169.003 189.286C167.372 188.527 166.231 187.66 165.578 186.685C165.47 185.167 165.415 183.596 165.415 181.97C165.415 180.345 165.415 178.773 165.415 177.256C165.415 165.118 166.285 152.438 168.025 139.217C169.873 125.995 172.863 111.69 176.994 96.3005C177.429 94.7833 177.918 92.7241 178.462 90.1232C179.005 87.5222 179.549 84.8128 180.092 81.9951C177.048 83.5123 173.569 86.4384 169.655 90.7734C165.85 95 161.936 100.202 157.914 106.379C154 112.448 150.086 119.222 146.172 126.7C142.367 134.177 138.888 141.818 135.735 149.621C132.691 157.315 130.082 165.01 127.908 172.704C125.842 180.291 124.592 187.281 124.157 193.675Z"
            fill="white"
        ></path>
    </svg>
);

const GitHubIcon = () => (
    <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.11.82-.26.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.222.687.825.577C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

const SlackIcon = () => (
    <svg width="1.8em" height="1.8em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.042 15.167a2.521 2.521 0 1 1-5.042 0 2.521 2.521 0 0 1 5.042 0Z" fill="#36C5F0"></path>
        <path d="M5.042 8.833a2.521 2.521 0 1 1 0 5.042h3.781V8.833H5.042Z" fill="#2EB67D"></path>
        <path d="M8.823 5.042a2.521 2.521 0 1 1 0-5.042 2.521 2.521 0 0 1 0 5.042Z" fill="#ECB22E"></path>
        <path d="M15.167 5.042a2.521 2.521 0 1 1-5.042 0v3.781h5.042V5.042Z" fill="#E01E5A"></path>
        <path d="M18.958 8.823a2.521 2.521 0 1 1 5.042 0 2.521 2.521 0 0 1-5.042 0Z" fill="#ECB22E"></path>
        <path d="M18.958 15.167a2.521 2.521 0 1 1 0-5.042H15.177v5.042h3.781Z" fill="#E01E5A"></path>
        <path d="M15.167 18.958a2.521 2.521 0 1 1 0 5.042 2.521 2.521 0 0 1 0-5.042Z" fill="#4A154B"></path>
        <path d="M8.823 18.958a2.521 2.521 0 1 1 5.042 0v-3.781H8.823v3.781Z" fill="#36C5F0"></path>
    </svg>
);

const DiscordIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="1.8em" height="1.8em" viewBox="0 0 48 48">
        <path
            fill="#8c9eff"
            d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z"
        ></path>
    </svg>
);

const CenterFlowerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        className="coolshapes flower-3"
    >
        <g clipPath="url(#cs_clip_1_flower-3)">
            <mask
                id="cs_mask_1_flower-3"
                style={{ maskType: "alpha" }}
                width="200"
                height="200"
                x="0"
                y="0"
                maskUnits="userSpaceOnUse"
            >
                <path
                    fill="#fff"
                    d="M200 50c0-27.614-22.386-50-50-50s-50 22.386-50 50c0-27.614-22.386-50-50-50S0 22.386 0 50s22.386 50 50 50c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50c0 27.614 22.386 50 50 50s50-22.386 50-50c0-27.608-22.375-49.989-49.98-50C177.625 99.99 200 77.608 200 50z"
                ></path>
            </mask>
            <g mask="url(#cs_mask_1_flower-3)">
                <path fill="#fff" d="M200 0H0v200h200V0z"></path>
                <path fill="url(#paint0_linear_748_4691_v3)" fillOpacity="0.55" d="M200 0H0v200h200V0z"></path>
                <g filter="url(#filter0_f_748_4691_v3)">
                    <path fill="#18A0FB" d="M131 3H-12v108h143V3z"></path>
                    <path fill="#FF58E4" d="M190 109H0v116h190V109z"></path>
                    <ellipse
                        cx="153.682"
                        cy="64.587"
                        fill="#FFD749"
                        rx="83"
                        ry="57"
                        transform="rotate(-33.875 153.682 64.587)"
                    ></ellipse>
                </g>
            </g>
        </g>
        <defs>
            <filter
                id="filter0_f_748_4691_v3"
                width="361.583"
                height="346.593"
                x="-72"
                y="-61.593"
                colorInterpolationFilters="sRGB"
                filterUnits="userSpaceOnUse"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                <feGaussianBlur result="effect1_foregroundBlur_748_4691" stdDeviation="30"></feGaussianBlur>
            </filter>
            <linearGradient
                id="paint0_linear_748_4691_v3"
                x1="200"
                x2="0"
                y1="0"
                y2="200"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#FF1F00"></stop>
                <stop offset="1" stopColor="#FFD600"></stop>
            </linearGradient>
            <clipPath id="cs_clip_1_flower-3">
                <path fill="#fff" d="M0 0H200V200H0z"></path>
            </clipPath>
        </defs>
        <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_flower-3)">
            <path fill="gray" stroke="transparent" d="M200 0H0v200h200V0z" filter="url(#cs_noise_1_flower-3_v3)"></path>
        </g>
        <defs>
            <filter
                id="cs_noise_1_flower-3_v3"
                width="100%"
                height="100%"
                x="0%"
                y="0%"
                filterUnits="objectBoundingBox"
            >
                <feTurbulence baseFrequency="0.6" numOctaves="5" result="out1" seed="4"></feTurbulence>
                <feComposite in="out1" in2="SourceGraphic" operator="in" result="out2"></feComposite>
                <feBlend in="SourceGraphic" in2="out2" mode="overlay" result="out3"></feBlend>
            </filter>
        </defs>
    </svg>
);

const IconWrapper = ({ children, className = "", isHighlighted = false, isActive = false }: IconWrapperProps) => (
    <div
        className={`
            backdrop-blur-xl rounded-2xl flex items-center justify-center border
            ${
                isHighlighted
                    ? "dark:bg-gray-700/50 bg-gray-100/80 border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
                    : `dark:bg-white/5 bg-white/60 dark:border-white/20 border-gray-300/60 ${
                          !isActive && "animate-float"
                      }`
            }
            ${isActive && "border-blue-400/60"}
            ${className}
        `}
        style={{
            transform: isActive ? "scale(1.1)" : "scale(1)",
            backgroundColor: isActive ? "rgba(129, 140, 248, 0.2)" : "rgba(255, 255, 255, 0.05)",
            transition: "transform 0.8s ease-in-out, background-color 0.8s ease-in-out, border-color 0.8s ease-in-out",
        }}
    >
        {children}
    </div>
);

const IconGrid = () => {
    const [activeId, setActiveId] = useState<number>(1);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);

    const outerIcons = useMemo(
        (): OuterIcon[] => [
            { id: 1, component: <SparkleIcon /> },
            { id: 2, component: <FigmaIcon /> },
            { id: 3, component: <CoralIcon /> },
            { id: 4, component: <SlackIcon /> },
            { id: 5, component: <PalmTreeIcon /> },
            { id: 6, component: <GitHubIcon /> },
            { id: 7, component: <FlowerIcon /> },
            { id: 8, component: <PerplexityIcon /> },
            { id: 9, component: <DiscordIcon /> },
        ],
        []
    );

    const radius = 160;
    const svgSize = 400;
    const svgCenter = svgSize / 2;
    const numIcons = outerIcons.length;

    const getIconPosition = useCallback(
        (index: number): IconPosition => {
            const angle = (-90 + index * (360 / numIcons)) * (Math.PI / 180);
            return {
                transformX: radius * Math.cos(angle),
                transformY: radius * Math.sin(angle),
                svgX: svgCenter + radius * Math.cos(angle),
                svgY: svgCenter + radius * Math.sin(angle),
            };
        },
        [numIcons, radius, svgCenter]
    );

    // Animation loop for particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, svgSize, svgSize);
            particlesRef.current.forEach((p, index) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 1;

                if (p.life <= 0) {
                    particlesRef.current.splice(index, 1);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2, false);
                    ctx.fillStyle = `rgba(59, 130, 246, ${p.life / 60})`;
                    ctx.fill();
                }
            });
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();

        return () => window.cancelAnimationFrame(animationFrameId);
    }, []);

    // Effect for sequential animation and particle emission
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveId((prevId) => {
                const currentIndex = outerIcons.findIndex((icon) => icon.id === prevId);
                const nextIndex = (currentIndex + 1) % outerIcons.length;

                // Emit particles from the new active icon's position
                const pos = getIconPosition(nextIndex);
                const iconCenterX = svgCenter + pos.transformX;
                const iconCenterY = svgCenter + pos.transformY;

                for (let i = 0; i < 20; i++) {
                    particlesRef.current.push({
                        x: iconCenterX,
                        y: iconCenterY,
                        vx: (Math.random() - 0.5) * 2,
                        vy: (Math.random() - 0.5) * 2,
                        size: Math.random() * 2 + 1,
                        life: Math.random() * 60,
                    });
                }

                return outerIcons[nextIndex].id;
            });
        }, 2500);

        return () => clearInterval(interval);
    }, [outerIcons, getIconPosition, svgCenter]);

    return (
        <div className="relative w-[400px] h-[400px] scale-75 md:scale-90 lg:scale-100">
            <canvas
                ref={canvasRef}
                width={svgSize}
                height={svgSize}
                className="absolute top-0 left-0 pointer-events-none z-10"
            ></canvas>

            <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
                <defs>
                    <filter id="glow_v6">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <g>
                    {outerIcons.map((icon1, i) => {
                        const p1 = getIconPosition(i);
                        return outerIcons.map((icon2, j) => {
                            if (i >= j) return null;

                            const p2 = getIconPosition(j);
                            const isLineActive = activeId === icon1.id || activeId === icon2.id;

                            return (
                                <line
                                    key={`line-${i}-${j}`}
                                    x1={p1.svgX}
                                    y1={p1.svgY}
                                    x2={p2.svgX}
                                    y2={p2.svgY}
                                    strokeWidth="1.5"
                                    style={{
                                        stroke: isLineActive ? "#3B82F6" : "#6B7280",
                                        opacity: isLineActive ? 0.8 : 0.15,
                                        filter: isLineActive ? "url(#glow_v6)" : "none",
                                        transition: "all 1.2s ease-in-out",
                                    }}
                                    className="dark:stroke-gray-600"
                                />
                            );
                        });
                    })}
                </g>
            </svg>

            <div className="absolute top-1/2 left-1/2">
                <div className="absolute -translate-x-1/2 -translate-y-1/2 z-20">
                    <IconWrapper className="w-24 h-24 p-4" isHighlighted={true}>
                        <CenterFlowerIcon />
                    </IconWrapper>
                </div>

                {outerIcons.map((icon, i) => {
                    const { transformX, transformY } = getIconPosition(i);
                    const isActive = activeId === icon.id;

                    return (
                        <div
                            key={icon.id}
                            className="absolute z-20"
                            style={{
                                top: 0,
                                left: 0,
                                transform: `translate(${transformX}px, ${transformY}px)`,
                                transition: "transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)",
                            }}
                        >
                            <div className="-translate-x-1/2 -translate-y-1/2 relative">
                                <div
                                    className="absolute inset-[-20px] bg-blue-500/20 dark:bg-blue-500/30 rounded-full blur-2xl"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transition: "opacity 0.8s ease-in-out",
                                    }}
                                />
                                <IconWrapper className="w-16 h-16" isActive={isActive}>
                                    {icon.component}
                                </IconWrapper>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function NexusOrbSup() {
    return (
        <div className="w-full flex items-center justify-center font-sans p-4 sm:p-8 overflow-hidden">
            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-8px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                @keyframes breathing-glow {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.1)); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.2)); }
                }
                @keyframes breathing-glow-light {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.05)); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.1)); }
                }
                .animate-breathing-glow {
                    animation: breathing-glow 4s ease-in-out infinite;
                }
                .dark .animate-breathing-glow {
                    animation: breathing-glow 4s ease-in-out infinite;
                }
                :not(.dark) .animate-breathing-glow {
                    animation: breathing-glow-light 4s ease-in-out infinite;
                }
            `}
            </style>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            </div>
            <div className="relative z-10 container mx-auto flex items-center justify-center">
                <IconGrid />
            </div>
        </div>
    );
}
