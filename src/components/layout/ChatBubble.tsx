'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Send, MessageCircle } from 'lucide-react';
import { loadChatConfig, type ChatConfig } from '@/data/chatConfig';

interface Message {
  id: number;
  from: 'user' | 'ez';
  text: string;
}

export default function ChatBubble() {
  const pathname = usePathname();
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [unread, setUnread] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Re-load config whenever the bubble becomes visible (e.g. navigating away from dashboard)
  const isDashboard = pathname.includes('/dashboard');
  useEffect(() => {
    if (isDashboard) return;
    const cfg = loadChatConfig();
    setConfig(cfg);
    setMessages([{ id: 0, from: 'ez', text: cfg.welcomeMessage }]);
  }, [isDashboard]);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  const getReply = (text: string): string => {
    if (!config) return '';
    const lower = text.toLowerCase();
    const match = config.keywords.find((k) => lower.includes(k.keyword.toLowerCase()));
    return match ? match.reply : config.defaultReply;
  };

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), from: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const reply: Message = { id: Date.now() + 1, from: 'ez', text: getReply(text) };
      setMessages((prev) => [...prev, reply]);
      if (!open) setUnread((n) => n + 1);
    }, 800);
  };

  if (!config || pathname.includes('/dashboard')) return null;

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-orange-100 flex flex-col overflow-hidden"
          style={{ height: '420px' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 text-white flex-shrink-0"
            style={{ backgroundColor: 'var(--ez-primary)' }}>
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm flex-shrink-0">
              EZ
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm leading-tight">EZ English</p>
              <p className="text-xs text-white/80">Tư vấn tuyển sinh</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors flex-shrink-0">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-none px-4 py-3 space-y-3 bg-gray-50" style={{ scrollbarWidth: 'none' }}>
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.from === 'ez' && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 flex-shrink-0 self-end mb-0.5"
                    style={{ backgroundColor: 'var(--ez-primary)' }}>
                    EZ
                  </div>
                )}
                <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm whitespace-pre-line ${
                  msg.from === 'user'
                    ? 'text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                }`}
                  style={msg.from === 'user' ? { backgroundColor: 'var(--ez-primary)' } : {}}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto flex-shrink-0 border-t border-gray-100 bg-white" style={{ scrollbarWidth: 'none' }}>
            {config.quickReplies.map((q) => (
              <button key={q} onClick={() => send(q)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors hover:bg-orange-50 whitespace-nowrap"
                style={{ borderColor: 'var(--ez-primary)', color: 'var(--ez-primary)' }}>
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 flex-shrink-0 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Nhập tin nhắn..."
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
            />
            <button onClick={() => send(input)}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all disabled:opacity-40 flex-shrink-0"
              style={{ backgroundColor: 'var(--ez-primary)' }}>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{ backgroundColor: 'var(--ez-primary)' }}
        aria-label="Chat với EZ English"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-6 h-6" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                {unread}
              </span>
            )}
          </>
        )}
      </button>
    </>
  );
}
