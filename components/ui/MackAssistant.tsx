"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./GlowCard";

interface Message {
  id: number;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date | null;
}

const suggestedQuestions = [
  "What is T.O.O.L.S. Inc?",
  "Tell me about MackChat",
  "What services do you offer?",
  "How much does development cost?",
  "What's your technology stack?"
];

const knowledgeBase = {
  "tools inc": {
    text: "T.O.O.L.S. Inc (Together Overcoming Obstacles and Limitations) is our flagship platform supporting justice-involved individuals with job readiness, education programs, lived-experience mentorship, and AI-powered career guidance. Current public traction includes 1,200+ views and an 87% success rate across program outcomes.",
    keywords: ["tools", "t.o.o.l.s", "reentry", "justice", "justice-involved", "program"],
    category: "Products"
  },
  "mackchat": {
    text: "MackChat is a revolutionary web-based messaging platform designed to connect military members with civilian supporters. It features real-time messaging, military-grade encryption (E2E), cross-platform support, and community channels. Beta: Q2 2026, Public: Q3 2026, Full Launch: Q4 2026.",
    keywords: ["mackchat", "messaging", "military", "chat", "communication", "platform"],
    category: "Products"
  },
  "services": {
    text: "A MackProjekt specializes in: (1) **Full-Stack Systems** - end-to-end production-grade applications; (2) **Data-Driven Design** - conversion-focused interfaces backed by research; (3) **API & Integration** - secure, documented APIs built for partners; (4) **Strategic Development** - aligning technology with business outcomes.",
    keywords: ["service", "what do you do", "what can you build", "capabilities", "offerings"],
    category: "Services"
  },
  "technology": {
    text: "Our tech stack: **Frontend** - Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion. **Backend** - Azure Functions, Node.js, TypeScript. **Database** - Azure Cosmos DB, PostgreSQL. **Infrastructure** - Azure Static Web Apps, Docker, GitHub Actions. We prioritize performance, security, and scalability.",
    keywords: ["tech stack", "technology", "built with", "frameworks", "languages", "infrastructure"],
    category: "Technical"
  },
  "retail business": {
    text: "For retail: E-commerce platforms with inventory management, payment processing (Stripe), customer analytics, personalization, and marketing automation. We integrate with Shopify, WooCommerce, and modern POS systems. Typical MVP: 8-12 weeks.",
    keywords: ["retail", "ecommerce", "e-commerce", "store", "shopify", "inventory"],
    category: "Industry Solutions"
  },
  "healthcare": {
    text: "For healthcare: HIPAA-compliant platforms, patient portals, telemedicine solutions, and health data analytics. We prioritize HIPAA compliance, encryption, audit logs, and accessibility standards. Experience with EHR integration and HL7 standards.",
    keywords: ["healthcare", "medical", "hipaa", "health", "patient", "telemedicine"],
    category: "Industry Solutions"
  },
  "nonprofit": {
    text: "For nonprofits: We offer **mission-aligned pricing** (20-30% discount). Services include donation platforms, volunteer management, impact tracking dashboards, and community engagement tools. We understand nonprofit constraints and priorities.",
    keywords: ["nonprofit", "non-profit", "charity", "ngo", "foundation", "mission"],
    category: "Industry Solutions"
  },
  "pricing": {
    text: "**Pricing:** Landing pages: $5K | Full websites: $15-30K | Custom platforms: $50K+ | Enterprise: Custom quote. We offer flexible payment plans, equity partnerships for mission-aligned startups, and retainer models for ongoing work.",
    keywords: ["price", "cost", "pricing", "budget", "rate", "quote", "affordable"],
    category: "Pricing & Engagement"
  },
  "founder": {
    text: "**Donyale 'DThree' Mack** - Founder & Lead Architect. Background: Justice system involvement (lived experience), which inspired T.O.O.L.S. Inc. Philosophy: Technology is a tool for social impact. Builds systems that matter.",
    keywords: ["founder", "donyale", "dthree", "mack", "creator", "team"],
    category: "About Us"
  },
  "timeline": {
    text: "Project timelines: **Landing pages** (2-3 weeks) | **Websites** (6-8 weeks) | **Custom platforms** (3-6 months) | **Enterprise** (6-12 months). We use agile methodology with weekly check-ins and continuous deployment.",
    keywords: ["timeline", "how long", "duration", "schedule", "delivery", "when"],
    category: "Process"
  },
  "support": {
    text: "**Maintenance & Support:** Starting at $500/month. Includes: Security updates, performance monitoring, bug fixes, feature enhancements. Premium: 24/7 monitoring, dedicated Slack, SLA. We believe in long-term partnerships.",
    keywords: ["support", "maintenance", "help", "sla", "ongoing", "retainer"],
    category: "Services"
  },
  "ai": {
    text: "**AI Capabilities:** Natural language processing, predictive analytics, recommendation engines, chatbots, RAG systems, vector search, and custom ML models. We work with OpenAI (GPT-4), Azure AI, and Anthropic depending on your needs.",
    keywords: ["ai", "machine learning", "artificial intelligence", "ml", "llm", "neural"],
    category: "Technical"
  },
  "default": {
    text: "I'm **MackAssistant**, your AI guide to A MackProjekt. I can help with: Products (T.O.O.L.S. Inc, MackChat), Services, Technology, Pricing, Industry solutions, and more. What interests you?",
    keywords: [],
    category: "General"
  }
};

function getResponse(query: string): string {
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return knowledgeBase["default"].text;
  
  // Calculate best match score for each knowledge base entry
  let bestMatch: [string, typeof knowledgeBase[keyof typeof knowledgeBase], number] = ["default", knowledgeBase["default"], 0];
  
  for (const [key, entry] of Object.entries(knowledgeBase)) {
    if (key === "default") continue;
    
    let score = 0;
    // Check keyword matches
    for (const keyword of entry.keywords) {
      if (lowerQuery.includes(keyword)) {
        score += keyword.split(' ').length * 10; // Longer keywords worth more
      }
    }
    
    // Word-based matching for better fuzzy search
    const queryWords = lowerQuery.split(/\s+/);
    for (const word of queryWords) {
      if (word.length > 2) {
        for (const keyword of entry.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 3;
          }
        }
      }
    }
    
    if (score > bestMatch[2]) {
      bestMatch = [key, entry, score];
    }
  }
  
  return bestMatch[1].text;
}

export function MackAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "👋 **Welcome!** I'm MackAssistant, powered by semantic search. Ask me about our products, services, pricing, or how we solve problems. What would you like to know?",
      sender: "assistant",
      timestamp: null,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: messages.length <= 1 ? "auto" : "smooth",
    });
  }, [messages]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: query,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSelectedQuestion(null);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = getResponse(query);
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
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
          <p className="text-xs text-muted">Semantic AI Search • Smart Context Matching</p>
        </div>
      </div>

      {/* Messages & Suggestions */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
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
                {message.timestamp && (
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2 mt-4"
          >
            <p className="text-xs text-muted font-semibold uppercase tracking-wide">Try these:</p>
            <div className="grid grid-cols-1 gap-2">
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={() => handleSend(q)}
                  className="text-left text-xs p-3 rounded-lg bg-panel border border-border/50 hover:border-brand/50 text-muted hover:text-text transition-all hover:bg-panel/80"
                >
                  💬 {q}
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
            <div className="bg-panel text-text border border-border rounded-lg p-3 flex gap-1">
              <div className="w-2 h-2 bg-brand rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-brand rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4 bg-bg/50 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about products, pricing, technology, or solutions..."
            className="flex-1 px-4 py-3 rounded-lg bg-panel border border-border text-text placeholder:text-muted/60 focus:border-brand focus:ring-1 focus:ring-brand/30 outline-none transition-all"
            aria-label="Ask MackAssistant a question"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand to-brand2 text-white font-semibold hover:shadow-lg hover:shadow-brand/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message to MackAssistant"
          >
            Send
          </button>
        </div>
        <p className="text-xs text-muted/70 text-center">
          💡 Tip: Be specific about your industry or use case for better answers
        </p>
      </div>
    </GlowCard>
  );
}
