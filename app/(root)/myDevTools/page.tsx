// components/MyDevTools.tsx
"use client";

import { useState } from "react";

const MyDevTools = () => {
    const [isOpen, setIsOpen] = useState(false);

    const mockAppState = {
        user: { name: "Alice", role: "admin" },
        theme: "dark",
        loggedIn: true,
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                right: 0,
                background: "rgba(0,0,0,0.85)",
                color: "lime",
                fontSize: "12px",
                padding: "10px",
                maxHeight: isOpen ? "300px" : "30px",
                overflowY: "auto",
                zIndex: 9999,
                width: isOpen ? "300px" : "80px",
                transition: "0.3s",
            }}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: "transparent",
                    color: "lime",
                    border: "1px solid lime",
                    padding: "2px 5px",
                    marginBottom: "5px",
                    cursor: "pointer",
                    fontSize: "10px",
                }}
            >
                {isOpen ? "Đóng" : "DevTools"}
            </button>

            {isOpen && <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(mockAppState, null, 2)}</pre>}
        </div>
    );
};

export default MyDevTools;
