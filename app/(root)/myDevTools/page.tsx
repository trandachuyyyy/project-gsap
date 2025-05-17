// components/MyDevTools.tsx
"use client";

import { useEffect, useState } from "react";
import { addListener, launch, removeListener } from "devtools-detector";
import { useRouter } from "next/navigation";
const MyDevTools = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const mockAppState = {
        user: { name: "Alice", role: "admin" },
        theme: "dark",
        loggedIn: true,
    };

    useEffect(() => {
        // Thêm listener để phát hiện khi DevTools được mở hoặc đóng
        const listener = (isOpen: boolean) => {
            if (isOpen) {
                router.push("/");
                // alert("DevTools đã được mở!");
            }
        };

        addListener(listener);
        launch(); // Bắt đầu phát hiện

        return () => {
            // Dọn dẹp khi component bị hủy
            removeListener(listener);
        };
    }, []);

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
