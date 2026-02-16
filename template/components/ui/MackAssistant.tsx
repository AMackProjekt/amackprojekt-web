"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./GlowCard";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const knowledgeBase = {
  "tools inc": "T.O.O.L.S. Inc (Together Overcoming Obstacles and Limitations) is our flagship platform supporting justice-involved individuals with job readiness, education programs, lived-experience mentorship, and AI-powered career guidance. We've served 1,200+ users with an 87% success rate.",
  
  "mackchat": "MackChat is a revolutionary web-based messaging platform designed to connect military members with civilian supporters. It features real-time messaging, military-grade encryption, cross-platform support, and community channels. Beta launches Q2 2026, public release Q3 2026.",
  
  "services": "A MackProjekt offers four core services: (1) Web Development - custom websites and web applications with Next.js, React, and TypeScript; (2) Platform Engineering - scalable platforms and APIs; (3) User Experience - beautiful, intuitive interfaces; (4) Digital Strategy - comprehensive planning for digital transformation.",
  
  "technology": "Our tech stack includes Next.js 16, React 18, TypeScript, Tailwind CSS, Azure Functions, Azure Cosmos DB, and Azure Static Web Apps. We prioritize serverless architecture, edge computing, and modern web standards for maximum performance and scalability.",
  
  "retail business": "For retail businesses, we can build e-commerce platforms with inventory management, payment processing, customer analytics, and marketing automation. Our solutions integrate with Shopify, Stripe, and modern POS systems. Typical timeline: 8-12 weeks for an MVP.",
  
  "healthcare": "For healthcare organizations, we specialize in HIPAA-compliant platforms, patient portals, telemedicine solutions, and health data analytics. We prioritize security, privacy, and accessibility in all healthcare projects.",
  
  "nonprofit": "For nonprofits, we offer discounted rates and purpose-driven development. Services include donation platforms, volunteer management systems, impact tracking dashboards, and community engagement tools. We understand the importance of mission-aligned technology.",
  
  "pricing": "Our pricing varies by project scope. Web development starts at $5,000 for landing pages, $15,000-$30,000 for full websites, and $50,000+ for custom platforms. We offer payment plans and equity partnerships for mission-aligned startups. Contact us for a detailed quote.",
  
  "founder": "A MackProjekt was founded by Donyale 'DThree' Mack, who combines lived experience with technical expertise to build purpose-driven technology. Donyale's background includes justice system involvement, which inspired the creation of T.O.O.L.S. Inc and the focus on social impact through innovation.",
  
  "timeline": "Typical project timelines: Landing pages (2-3 weeks), Full websites (6-8 weeks), Custom platforms (3-6 months), Enterprise solutions (6-12 months). We use agile methodology with weekly check-ins and continuous deployment.",
  
  "support": "We provide ongoing support and maintenance packages starting at $500/month. This includes security updates, performance monitoring, bug fixes, and feature enhancements. Premium support includes 24/7 monitoring and dedicated Slack channels.",
  
  "ai": "We integrate AI capabilities including natural language processing, predictive analytics, recommendation engines, and chatbots. We work with OpenAI, Azure AI, and custom machine learning models depending on your needs and budget.",
  
  "default": "I'm MackAssistant, your AI guide to A MackProjekt's services. I can help you understand our products (T.O.O.L.S. Inc, MackChat), our services (web development, platform engineering), pricing, timelines, and more. What would you like to know?"
};

function getResponse(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  // Check for specific keywords
  if (lowerQuery.includes("tools") || lowerQuery.includes("t.o.o.l.s") || lowerQuery.includes("reentry") || lowerQuery.includes("justice")) {
    return knowledgeBase["tools inc"];
  }
  if (lowerQuery.includes("mackchat") || lowerQuery.includes("messaging") || lowerQuery.includes("military")) {
    return knowledgeBase["mackchat"];
  }
  if (lowerQuery.includes("service") || lowerQuery.includes("what do you do") || lowerQuery.includes("what can you build")) {
    return knowledgeBase["services"];
  }
  if (lowerQuery.includes("tech stack") || lowerQuery.includes("technology") || lowerQuery.includes("built with")) {
    return knowledgeBase["technology"];
  }
  if (lowerQuery.includes("retail") || lowerQuery.includes("ecommerce") || lowerQuery.includes("e-commerce") || lowerQuery.includes("store")) {
    return knowledgeBase["retail business"];
  }
  if (lowerQuery.includes("healthcare") || lowerQuery.includes("medical") || lowerQuery.includes("hipaa")) {
    return knowledgeBase["healthcare"];
  }
  if (lowerQuery.includes("nonprofit") || lowerQuery.includes("non-profit") || lowerQuery.includes("charity")) {
    return knowledgeBase["nonprofit"];
  }
  if (lowerQuery.includes("price") || lowerQuery.includes("cost") || lowerQuery.includes("pricing") || lowerQuery.includes("budget")) {
    return knowledgeBase["pricing"];
  }
  if (lowerQuery.includes("founder") || lowerQuery.includes("donyale") || lowerQuery.includes("dthree") || lowerQuery.includes("mack")) {
    return knowledgeBase["founder"];
  }
  if (lowerQuery.includes("timeline") || lowerQuery.includes("how long") || lowerQuery.includes("duration")) {
    return knowledgeBase["timeline"];
  }
  if (lowerQuery.includes("support") || lowerQuery.includes("maintenance") || lowerQuery.includes("help")) {
    return knowledgeBase["support"];
  }
  if (lowerQuery.includes("ai") || lowerQuery.includes("machine learning") || lowerQuery.includes("artificial intelligence")) {
    return knowledgeBase["ai"];
  }
  
  return knowledgeBase["default"];
}

export function MackAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 Hi! I'm MackAssistant. Ask me anything about A MackProjekt's services, products, or how we can help your business.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <GlowCard className="flex flex-col h-[600px] max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-brand to-brand2 flex items-center justify-center text-xl">
          🤖
        </div>
        <div>
          <h3 className="text-lg font-bold text-text">MackAssistant</h3>
          <p className="text-xs text-muted">AI-powered search • RAG-enabled</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-brand text-white"
                    : "bg-panel text-text border border-border"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs opacity-60 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-panel text-text border border-border rounded-lg p-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-brand rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1 px-4 py-3 rounded-lg bg-panel border border-border text-text focus:border-brand outline-none transition-colors"
            aria-label="Ask MackAssistant a question"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 py-3 rounded-lg bg-brand text-white font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message to MackAssistant"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-muted mt-2 text-center">
          Try asking: "What can you build for my retail business?" or "Tell me about pricing"
        </p>
      </div>
    </GlowCard>
  );
}
