"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setMessage("Please fill in all fields");
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      // Parse name into firstName and lastName
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Call the API endpoint
      const response = await fetch("/api/waitlist-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          firstName,
          lastName,
          source: "website-form",
        }),
      });

      const data = await response.json() as { success?: boolean; message?: string };

      if (response.ok && data.success) {
        setStatus("success");
        setMessage("✅ " + (data.message || "Added to waitlist! Check your email for updates."));
        setEmail("");
        setName("");
        
        // Reset after 5 seconds
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 5000);
      } else {
        setStatus("error");
        setMessage(data.message || "Failed to join waitlist. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error joining waitlist. Please try again or email us directly.");
      console.error("Waitlist error:", error);
    }
  };

  const mailtoLink = `mailto:waitlist@mackprojekt.com?subject=Join%20AMP%20Waitlist&body=Hi!%20I'd%20like%20to%20join%20the%20AMP%20waitlist.%0A%0AName:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("w-full", className)}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={status === "loading"}
            className={cn(
              "w-full rounded-lg bg-panel border border-border px-4 py-3",
              "text-text placeholder:text-muted",
              "focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand",
              "transition-all duration-200",
              status === "loading" && "opacity-60 cursor-not-allowed"
            )}
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className={cn(
              "w-full rounded-lg bg-panel border border-border px-4 py-3",
              "text-text placeholder:text-muted",
              "focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand",
              "transition-all duration-200",
              status === "loading" && "opacity-60 cursor-not-allowed"
            )}
          />
        </div>

        {/* Status Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={cn(
              "p-3 rounded-lg text-sm font-medium",
              status === "success" && "bg-green-500/10 text-green-400 border border-green-500/30",
              status === "error" && "bg-red-500/10 text-red-400 border border-red-500/30"
            )}
          >
            {message}
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "w-full",
            status === "loading" && "opacity-60 cursor-not-allowed",
            status === "success" && "bg-green-600 hover:bg-green-700"
          )}
        >
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-muted">OR</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Alternative Methods */}
      <div className="space-y-3">
        {/* Email Link */}
        <a href={mailtoLink} className="block">
          <Button variant="ghost" className="w-full justify-center">
            📧 Email us directly
          </Button>
        </a>

        {/* Copy Email */}
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText("waitlist@mackprojekt.com");
            alert("Email copied to clipboard!");
          }}
          className={cn(
            "w-full px-4 py-2 rounded-lg border border-border",
            "bg-panel hover:bg-panel/80",
            "text-text text-sm font-medium",
            "transition-all duration-200"
          )}
        >
          📋 Copy Email Address
        </button>
      </div>

      {/* Info */}
      <p className="mt-4 text-xs text-muted text-center">
        We respect your privacy. No spam, just updates about AMP.
      </p>
    </motion.div>
  );
}
