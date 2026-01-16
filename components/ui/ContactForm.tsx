"use client";

import { useState } from "react";
import { Button } from "./Button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit contact form");
      }

      const data = await response.json();
      console.log("Contact form submitted:", data);
      
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none"
          placeholder="Your message..."
        />
      </div>

      {status === "success" && (
        <div className="rounded-lg bg-brand2/10 border border-brand2/20 px-4 py-3 text-brand2 text-sm">
          ✓ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      {status === "error" && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-400 text-sm">
          ✗ {errorMessage || "Failed to send message. Please try again."}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
