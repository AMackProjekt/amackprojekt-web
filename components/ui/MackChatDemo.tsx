"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./GlowCard";

const demoMessages = [
  { id: 1, user: "Sarah M.", avatar: "👩‍💼", message: "Team, the new deployment is live!", time: "2:34 PM", type: "sent" },
  { id: 2, user: "Mike R.", avatar: "👨‍💻", message: "Great work! Testing now.", time: "2:35 PM", type: "received" },
  { id: 3, user: "You", avatar: "🚀", message: "Thanks team! Let me know if you see any issues.", time: "2:36 PM", type: "sent" },
];

export function MackChatDemo() {
  const [messages, setMessages] = useState(demoMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: "You",
      avatar: "🚀",
      message: inputValue,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: "sent" as const,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: messages.length + 2,
        user: "MackAI",
        avatar: "🤖",
        message: "This is a demo preview! Full features coming Q2 2026.",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: "received" as const,
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  return (
    <GlowCard className="overflow-hidden">
      {/* Header */}
      <div className="glass border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-sm">
                👥
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-text">Team Channel</div>
              <div className="text-xs text-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                3 members online
              </div>
            </div>
          </div>
          <div className="text-xs text-muted">DEMO MODE</div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-bg/50 px-6 py-4 h-[320px] overflow-y-auto space-y-4">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex items-start gap-3 ${msg.type === 'sent' ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand/20 to-brand2/20 flex items-center justify-center text-lg flex-shrink-0">
                {msg.avatar}
              </div>
              <div className={`flex-1 ${msg.type === 'sent' ? 'text-right' : ''}`}>
                <div className="flex items-baseline gap-2 mb-1">
                  {msg.type === 'received' && (
                    <span className="text-xs font-semibold text-text">{msg.user}</span>
                  )}
                  <span className="text-xs text-muted">{msg.time}</span>
                </div>
                <div
                  className={`inline-block rounded-2xl px-4 py-2 max-w-[80%] ${
                    msg.type === 'sent'
                      ? 'bg-gradient-to-r from-brand to-brand2 text-white'
                      : 'glass border border-border text-text'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand/20 to-brand2/20 flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="glass border border-border rounded-2xl px-4 py-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="glass border-t border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-bg/50 border border-border rounded-lg px-4 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-brand to-brand2 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="mt-2 text-xs text-muted text-center">
          Interactive demo - Full features launching Q2 2026
        </p>
      </div>
    </GlowCard>
  );
}
