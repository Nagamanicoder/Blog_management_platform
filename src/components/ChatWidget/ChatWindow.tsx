import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { useState, useRef, useEffect } from "react";

import { fetchLLMReply } from "../../utils/api/chatbot/fetchllm";
import { useAuth } from "../../context/AuthContext";

const COLORS = {
  turq: "#0BBFBF",
  turqDark: "#089898",
};

const WriteIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
);

interface Props {
  onClose: () => void;
}

export function ChatWindow({ onClose }: Props) {
  const { user } = useAuth();

  const [messages, setMessages] = useState([
    {
      role: "assistant" as const,
      content:
        "Hi there! ✍️ I'm your writing assistant. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const userInitial =
    user?.username?.trim()?.charAt(0)?.toUpperCase() || "U";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sendMessage = async () => {
    const text = input.trim();

    if (!text || loading) return;

    const userMsg = {
      role: "assistant" as const,
      content: text,
    };

    const updated = [...messages, userMsg];

    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      const reply = await fetchLLMReply(updated);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: reply,
        },
      ]);
    } catch (e: any) {
      const msg =
        e.message === "Session expired"
          ? "Session expired. Please log in again."
          : "Something went wrong. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant" as const,
          content: msg,
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="w-[360px] h-[560px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200">

      {/* Header */}
      <div
        className="flex items-center gap-3 px-4 py-4"
        style={{
          background: `linear-gradient(135deg, ${COLORS.turq}, ${COLORS.turqDark})`,
        }}
      >
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
          <WriteIcon size={18} />
        </div>

        <div className="flex-1">
          <h2 className="text-white font-semibold text-[15px]">
            Writing Assistant
          </h2>

          <div className="flex items-center gap-2 text-[12px] text-white/80">
            <div className="w-2 h-2 rounded-full bg-emerald-300" />
            Online
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 transition flex items-center justify-center text-white"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 bg-slate-50">

        {messages.map((m, i) => {
          const isUser = m.role === "assistant";

          return (
            <div
              key={i}
              className={`flex gap-2 items-end ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              {isUser ? (
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  {userInitial}
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-md"
                  style={{
                    background: COLORS.turq,
                  }}
                >
                  <WriteIcon size={15} />
                </div>
              )}

              {/* Bubble */}
              <div
                className={`
                  max-w-[78%]
                  px-4
                  py-3
                  text-[14px]
                  leading-7
                  shadow-sm
                  break-words
                  prose
                  prose-sm
                  prose-slate
                  max-w-none
                  ${isUser
                    ? "bg-cyan-500 text-white rounded-[18px_18px_4px_18px]"
                    : "bg-white text-slate-800 rounded-[18px_18px_18px_4px]"
                  }
                `}
              >
                {isUser ? (
                  <p className="m-0 whitespace-pre-wrap">
                    {m.content}
                  </p>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => (
                        <p className="mb-3 last:mb-0 leading-7">
                          {children}
                        </p>
                      ),

                      h1: ({ children }) => (
                        <h1 className="text-xl font-bold mb-3 mt-2">
                          {children}
                        </h1>
                      ),

                      h2: ({ children }) => (
                        <h2 className="text-lg font-semibold mb-3 mt-5">
                          {children}
                        </h2>
                      ),

                      h3: ({ children }) => (
                        <h3 className="text-base font-semibold mb-2 mt-4">
                          {children}
                        </h3>
                      ),

                      ul: ({ children }) => (
                        <ul className="list-disc pl-5 mb-3 space-y-1">
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5 mb-3 space-y-1">
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li className="leading-7">
                          {children}
                        </li>
                      ),

                      strong: ({ children }) => (
                        <strong className="font-semibold">
                          {children}
                        </strong>
                      ),

                      code: ({ children }) => (
                        <code className="bg-slate-200 px-1 py-0.5 rounded text-[13px]">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing */}
        {loading && (
          <div className="flex gap-2 items-end">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{
                background: COLORS.turq,
              }}
            >
              <WriteIcon size={15} />
            </div>

            <div className="bg-white rounded-[18px_18px_18px_4px] px-4 py-3 shadow-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full animate-bounce"
                  style={{
                    background: COLORS.turq,
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white p-3 flex items-center gap-2">

        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            !e.shiftKey &&
            sendMessage()
          }
          placeholder="Write something..."
          className="
            flex-1
            border
            border-slate-300
            rounded-xl
            px-4
            py-2.5
            text-sm
            outline-none
            focus:ring-2
            focus:ring-cyan-400
            focus:border-cyan-400
            transition
          "
        />

        <button
          onClick={sendMessage}
          disabled={!input.trim() || loading}
          className="
            w-10
            h-10
            rounded-full
            flex
            items-center
            justify-center
            text-white
            transition
            disabled:bg-slate-300
          "
          style={{
            background:
              input.trim() && !loading
                ? COLORS.turq
                : "#cbd5e1",
          }}
        >
          <WriteIcon size={16} />
        </button>
      </div>
    </div>
  );
}