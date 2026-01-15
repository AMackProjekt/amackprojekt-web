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

const botResponses: Record<string, string> = {
  greeting: "Hello! I'm MackAi, here to help you learn about T.O.O.L.S Inc programs and support services. How can I assist you today?",
  programs: "We offer four core programs: Job Readiness Training, Continued Education, Lived Experience Support, and Personal Growth Programs. Which would you like to know more about?",
  "job readiness": "Our Job Readiness program includes resume building, mock interviews, career planning, and professional development to prepare you for success in the workforce.",
  education: "We provide access to educational resources, training programs, skill development courses, and support for continuing your education journey.",
  "lived experience": "Our team has lived experience with the challenges our clients face. This creates genuine understanding and more effective, empathetic support.",
  referral: "You can submit a referral for justice-involved individuals through our Referral Form page. We also have a QR code available for easy access.",
  support: "To get support, you can fill out our Interest Form or contact us directly. We typically respond within 48 hours.",
  contact: "You can reach us through our Contact page, submit an Interest Form, or call our office. We're here to help you start your journey.",
  help: "I can help you with information about our programs, how to get support, referral process, and general questions about T.O.O.L.S Inc. What would you like to know?",
};

function getBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return botResponses.greeting;
  }
  if (msg.includes("program") || msg.includes("service")) {
    return botResponses.programs;
  }
  if (msg.includes("job") || msg.includes("employment") || msg.includes("career")) {
    return botResponses["job readiness"];
  }
  if (msg.includes("education") || msg.includes("training") || msg.includes("learn")) {
    return botResponses.education;
  }
  if (msg.includes("lived experience") || msg.includes("understanding")) {
    return botResponses["lived experience"];
  }
  if (msg.includes("referral") || msg.includes("refer")) {
    return botResponses.referral;
  }
  if (msg.includes("support") || msg.includes("help") || msg.includes("need")) {
    return botResponses.support;
  }
  if (msg.includes("contact") || msg.includes("reach") || msg.includes("call")) {
    return botResponses.contact;
  }
  
  return "I'd be happy to help you with information about our programs, support services, or how to get started. You can also visit our Interest Form page or Contact us directly for personalized assistance.";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm MackAi, your T.O.O.L.S Inc assistant. Ask me about our programs, how to get support, or anything else!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(input),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "Programs",
    "Get Support",
    "Referral Process",
    "Contact Info",
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full",
          "bg-gradient-to-br from-brand to-brand2 text-white shadow-glow",
          "hover:shadow-xl transition-shadow"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
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
            <div className="flex items-center justify-between p-4 border-b border-border bg-bg/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-brand to-brand2 flex items-center justify-center text-white font-bold">
                  MA
                </div>
                <div>
                  <div className="font-semibold text-text">MackAi</div>
                  <div className="text-xs text-muted">Always here to help</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm",
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-brand to-brand2 text-white"
                        : "glass text-text"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass rounded-lg px-4 py-2 text-sm">
                    <div className="flex gap-1">
                      <span className="animate-bounce [animation-delay:0ms]">●</span>
                      <span className="animate-bounce [animation-delay:150ms]">●</span>
                      <span className="animate-bounce [animation-delay:300ms]">●</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <div className="text-xs text-muted mb-2">Quick questions:</div>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => {
                        setInput(action);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="text-xs px-3 py-1 rounded-full glass hover:shadow-glow transition-shadow text-text"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-bg/50 backdrop-blur-sm">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 rounded-lg bg-panel border border-border px-4 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "px-4 py-2 rounded-lg font-semibold text-sm transition-all",
                    input.trim()
                      ? "bg-gradient-to-br from-brand to-brand2 text-white hover:shadow-glow"
                      : "bg-panel text-muted cursor-not-allowed"
                  )}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
