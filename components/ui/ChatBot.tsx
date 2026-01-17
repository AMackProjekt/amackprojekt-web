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
  greeting: "Hello! I'm MackAi, your digital assistant from A MackProjekt. I can help you learn about our innovative digital solutions and services. How can I assist you today?",
  innovation: "At A MackProjekt, we focus on cutting-edge solutions that harness AI and modern technology to destroy the digital divide and empower communities.",
  design: "We create beautiful, intuitive user experiences backed by research and best practices in UX design. Our interfaces are both powerful and delightful to use.",
  technology: "We leverage modern tech stacks including Next.js, React, TypeScript, Azure, and cloud platforms to build scalable, high-performance solutions.",
  growth: "Our solutions are designed with scalability in mind, ensuring your platform can grow seamlessly with your business needs and user base.",
  mackchat: "MackChat is our next-gen messaging platform coming soon! It will bring teams and communities together with real-time communication, modern features, and seamless integration.",
  contact: "You can reach us at ampstudio@mackprojekt.com or join our waitlist to stay updated on our latest projects and launches!",
  help: "I can help you learn about our innovation approach, design philosophy, technology stack, growth solutions, and upcoming projects like MackChat. What would you like to know?",
};

function getBotResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
    return botResponses.greeting;
  }
  if (msg.includes("innovation") || msg.includes("ai") || msg.includes("cutting-edge")) {
    return botResponses.innovation;
  }
  if (msg.includes("design") || msg.includes("ux") || msg.includes("interface") || msg.includes("experience")) {
    return botResponses.design;
  }
  if (msg.includes("technology") || msg.includes("tech") || msg.includes("stack") || msg.includes("next") || msg.includes("react")) {
    return botResponses.technology;
  }
  if (msg.includes("growth") || msg.includes("scalable") || msg.includes("scale")) {
    return botResponses.growth;
  }
  if (msg.includes("mackchat") || msg.includes("messaging") || msg.includes("chat")) {
    return botResponses.mackchat;
  }
  if (msg.includes("contact") || msg.includes("reach") || msg.includes("waitlist") || msg.includes("join")) {
    return botResponses.contact;
  }
  if (msg.includes("help") || msg.includes("what") || msg.includes("how")) {
    return botResponses.help;
  }
  
  return "I'd be happy to help you learn about A MackProjekt's innovation approach, design philosophy, technology solutions, or our upcoming MackChat platform. What interests you most?";
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm MackAi, your A MackProjekt assistant. Ask me about our digital innovation, design services, technology solutions, or our upcoming MackChat platform!",
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
    "Innovation",
    "Design Services",
    "Technology Stack",
    "MackChat Platform",
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
