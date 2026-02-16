"use client";

import { useState, FormEvent } from "react";
import { Button } from "./Button";
import { motion } from "framer-motion";

interface WaitlistFormProps {
  source?: string;
  className?: string;
}

export function WaitlistForm({ source = "direct", className = "" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Use environment variable or default to /api
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "/api";
      const response = await fetch(`${apiUrl}/waitlist/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          source,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setMessage(
          data.message || "✅ Welcome! Check your email for the Innovation Roadmap PDF."
        );
        setEmail("");
        setFirstName("");
        setLastName("");
      } else {
        setSuccess(false);
        setMessage(data.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setSuccess(false);
      setMessage("Network error. Please check your connection and try again.");
      console.error("Waitlist error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-muted mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-muted mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
              placeholder="Doe"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted mb-2">
            Email Address <span className="text-brand">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading || !email}
        >
          {loading ? "Joining..." : "Join the Waitlist"}
        </Button>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg p-4 text-sm ${
              success
                ? "bg-brand/10 border border-brand/30 text-brand"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {message}
          </motion.div>
        )}
      </form>

      <p className="mt-4 text-xs text-muted text-center">
        By joining, you'll receive early access, exclusive updates, and our 2026 Innovation Roadmap PDF.
      </p>
    </div>
  );
}
