import { useState } from "react";
import { ChatWindow } from "./ChatWindow";

const COLORS = { turq: "#0BBFBF", turqDark: "#089898" };

const WriteIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes bounce  { 0%,80%,100% { transform:translateY(0);    opacity:0.4; } 40% { transform:translateY(-6px); opacity:1; } }
        @keyframes popIn   { from { transform:scale(0.85); opacity:0; } to { transform:scale(1); opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) scale(0.97); } to { opacity:1; transform:translateY(0) scale(1); } }
      `}</style>

      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

        <button
          onClick={() => setIsOpen(o => !o)}
          style={{ width: 56, height: 56, borderRadius: "50%", border: "none", background: isOpen ? COLORS.turqDark : COLORS.turq, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(11,191,191,0.45)", transition: "transform 0.2s, background 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isOpen ? <span style={{ color: "#fff", fontSize: 20 }}>✕</span> : <WriteIcon size={24} />}
        </button>
      </div>
    </>
  );
}
