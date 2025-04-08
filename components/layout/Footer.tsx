import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-black/80 text-gray-400 py-6 border-t border-white/10 text-center text-sm">
            <p className="mb-2">&copy; {new Date().getFullYear()} Huy Tran. All rights reserved.</p>
            <p>
                Built with ❤️ using Next.js, TailwindCSS
            </p>
        </footer>
    );
};

export default Footer;
