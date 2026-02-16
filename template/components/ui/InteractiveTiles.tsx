"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { GlowCard } from "./GlowCard";

const tiles = [
  {
    icon: "📋",
    title: "Submit Interest Form",
    description: "Let us know how we can support you",
    action: "Get Started",
    href: "/interest",
    color: "from-brand to-brand2",
  },
  {
    icon: "🤝",
    title: "Submit Referral",
    description: "Refer someone who could benefit from our programs",
    action: "Refer Now",
    href: "/referral",
    color: "from-brand2 to-accent",
  },
  {
    icon: "💬",
    title: "Live Chat Support",
    description: "Get instant answers to your questions",
    action: "Chat Now",
    onClick: "openChat",
    color: "from-accent to-brand",
  },
  {
    icon: "📚",
    title: "View Programs",
    description: "Explore our comprehensive support services",
    action: "Learn More",
    href: "#platform",
    color: "from-brand to-accent",
  },
];

type Props = {
  onChatOpen?: () => void;
};

export function InteractiveTiles({ onChatOpen }: Props) {
  const handleClick = (tile: typeof tiles[0]) => {
    if (tile.onClick === "openChat" && onChatOpen) {
      onChatOpen();
    } else if (tile.href) {
      if (tile.href.startsWith("#")) {
        document.querySelector(tile.href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = tile.href;
      }
    }
  };

  return (
    <section className="mx-auto max-w-container px-7 py-16">
      <div className="text-center mb-10">
        <div className="text-xs font-semibold tracking-[0.18em] text-brand2 uppercase">
          Quick Actions
        </div>
        <h2 className="h2 mt-4">
          How Can We Help You Today?
        </h2>
        <p className="mx-auto mt-4 max-w-[680px] text-muted">
          Choose an action below to get started with our services, or chat with MackAi for instant assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((tile, index) => (
          <motion.div
            key={tile.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            onClick={() => handleClick(tile)}
          >
            <GlowCard
              className="group relative cursor-pointer overflow-hidden h-full"
            >
              {/* Background gradient (appears on hover) */}
              <motion.div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                  tile.color
                )}
              />

              <div className="relative flex flex-col h-full">
                <div className="text-4xl mb-4">{tile.icon}</div>
                
                <h3 className="text-lg font-extrabold tracking-tight text-text mb-2">
                  {tile.title}
                </h3>
                
                <p className="text-sm text-muted leading-relaxed mb-6 flex-1">
                  {tile.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-brand group-hover:text-brand2 transition-colors">
                  {tile.action}
                  <motion.span
                    className="inline-block"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: "< 5min", label: "Average Response Time" },
          { value: "24/7", label: "MackAi Availability" },
          { value: "100%", label: "Confidential Support" },
          { value: "48hrs", label: "Form Response Time" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-lg p-4 text-center">
            <div className="text-2xl font-extrabold tracking-tight text-brand">
              {stat.value}
            </div>
            <div className="mt-1 text-xs text-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
