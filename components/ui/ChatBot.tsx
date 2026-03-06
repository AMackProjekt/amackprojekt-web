"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const knowledgeBase = {
  greeting: "Hello! 👋 I'm **MackAi**, your A MackProjekt guide. I can help with T.O.O.L.S. Inc, MackChat, our services, or any technical questions. What interests you?",
  
  tools: "**T.O.O.L.S. Inc** is our flagship reentry platform for justice-involved individuals. Features: Job readiness, education programs, mentorship, AI career guidance. **Results:** 120+ users, 87% success rate.",
  
  mackchat: "**MackChat** launches Q2 2026! It's a military-civilian messaging platform with E2E encryption, real-time chat, and community channels. Beta Q2 → Public Q3 → Full Q4 2026.",
  
  services: "We specialize in **Full-Stack Systems**, **Data-Driven Design**, **API & Integration**, and **Strategic Development**. From startups to enterprise—we deliver systems engineered to win.",
  
  technology: "**Tech Stack:** Next.js 14 | React 18 | TypeScript | Tailwind | Azure Functions | Cosmos DB | Azure Static Web Apps. We prioritize performance, security, and scale.",
  
  pricing: "**Custom Pricing:** Landing pages ($5K) | Websites ($15-30K) | Platforms ($50K+) | Enterprise (custom). We offer flexible payment plans and equity partnerships for mission-driven companies.",
  
  process: "**Our Process:** Discovery → Design → Development → Testing → Deployment → Support. We use **Agile** with weekly check-ins and **continuous deployment**.",
  
  support: "**Support Plans:** Starting at $500/month. Includes security updates, monitoring, bug fixes, and feature enhancements. Premium includes 24/7 monitoring + dedicated Slack.",
  
  contact: "📧 **Email:** ampstudio@mackprojekt.com | 🔗 **GitHub:** github.com/amackprojekt | 📋 **Join our waitlist** for early access to new products!",
  
  default: "I'm here to help! Ask me about **T.O.O.L.S. Inc**, **MackChat**, **services**, **pricing**, **technology**, or **how to get started**."
};

function getBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase().trim();
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("start")) {
    return knowledgeBase.greeting;
  }
  if (msg.includes("tools") || msg.includes("t.o.o.l.s") || msg.includes("reentry") || msg.includes("justice")) {
    return knowledgeBase.tools;
  }
  if (msg.includes("mackchat") || msg.includes("messaging") || msg.includes("military") || msg.includes("chat")) {
    return knowledgeBase.mackchat;
  }
  if (msg.includes("service") || msg.includes("what do you do") || msg.includes("can you")) {
    return knowledgeBase.services;
  }
  if (msg.includes("technology") || msg.includes("tech") || msg.includes("stack") || msg.includes("built")) {
    return knowledgeBase.technology;
  }
  if (msg.includes("price") || msg.includes("cost") || msg.includes("budget") || msg.includes("how much")) {
    return knowledgeBase.pricing;
  }
  if (msg.includes("process") || msg.includes("how do you work") || msg.includes("methodology")) {
    return knowledgeBase.process;
  }
  if (msg.includes("support") || msg.includes("maintain") || msg.includes("sla") || msg.includes("ongoing")) {
    return knowledgeBase.support;
  }
  if (msg.includes("contact") || msg.includes("reach") || msg.includes("email") || msg.includes("join")) {
    return knowledgeBase.contact;
  }
  
  return knowledgeBase.default;
}

interface QuickAction {
  label: string;
  message: string;
  icon: string;
}

const quickActions: QuickAction[] = [
  { label: "T.O.O.L.S. Inc", message: "Tell me about T.O.O.L.S. Inc", icon: "🎓" },
  { label: "MackChat", message: "What is MackChat?", icon: "💬" },
  { label: "Services", message: "What services do you offer?", icon: "🛠️" },
  { label: "Pricing", message: "How much does development cost?", icon: "💰" },
];

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "👋 **Hi!** I'm **MackAi**—your AI guide to A MackProjekt. Ask me anything about our products, services, or how we can help build your next big thing!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setShowQuickActions(false);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(message),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button - Floating Widget */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-brand to-brand2 text-white shadow-glow",
          "hover:shadow-xl transition-shadow"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open MackAi chat assistant"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </motion.div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] h-[600px] rounded-xl bg-panel border border-border shadow-glow overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-to-r from-bg/80 to-bg/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-white font-bold text-sm">
                  AI
                </div>
                <div>
                  <div className="font-semibold text-text text-sm">MackAi</div>
                  <div className="text-xs text-muted">✓ Online</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted hover:text-text transition-colors"
                aria-label="Close chat"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3 text-sm leading-relaxed",
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-brand to-brand2 text-white"
                          : "glass text-text border border-border/50"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Quick Actions - Show on initial load */}
              {messages.length === 1 && showQuickActions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 mt-4 pt-4 border-t border-border/30"
                >
                  <p className="text-xs text-muted font-semibold uppercase tracking-wide px-1">Quick start:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, i) => (
                      <motion.button
                        key={action.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + i * 0.05 }}
                        onClick={() => handleSend(action.message)}
                        className="text-xs p-2 rounded-lg bg-panel/50 border border-border/30 hover:border-brand/50 text-muted hover:text-text transition-all hover:bg-panel/80 text-left"
                      >
                        <div className="text-lg mb-1">{action.icon}</div>
                        <div className="font-semibold">{action.label}</div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="glass rounded-lg px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-brand rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></span>
                      <span className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask anything..."
                  className="flex-1 rounded-lg bg-panel border border-border px-3 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-brand focus:ring-1 focus:ring-brand/30 outline-none transition-all"
                  aria-label="Type your message"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={cn(
                    "px-4 py-2.5 rounded-lg font-semibold text-sm transition-all",
                    input.trim()
                      ? "bg-gradient-to-r from-brand to-brand2 text-white hover:shadow-lg hover:shadow-brand/30"
                      : "bg-panel text-muted cursor-not-allowed"
                  )}
                  aria-label="Send message"
                >
                  Send
                </button>
              </div>
              <p className="text-xs text-muted/50 text-center">Powered by MackAi</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
