import React from "react";

const Footer = () => {
    return (
        <footer className="w-full dark:bg-black/80 bg-white/80 dark:text-gray-400 text-gray-600 py-6 border-t dark:border-white/10 border-black/10 text-center text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} Huy Tran. All rights reserved.</p>
            <p>Built with ❤️ using Next.js, TailwindCSS</p>
        </footer>
    );
};

export default Footer;
