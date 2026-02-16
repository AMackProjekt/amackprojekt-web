"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlowCard } from "./GlowCard";
import { Button } from "./Button";

const endpoints = [
  {
    method: "GET",
    path: "/api/v1/projects",
    description: "Retrieve all projects",
    response: {
      success: true,
      data: [
        { id: 1, name: "T.O.O.L.S. Inc", status: "live", users: 1200 },
        { id: 2, name: "MackChat", status: "beta", users: 450 }
      ]
    }
  },
  {
    method: "POST",
    path: "/api/v1/projects",
    description: "Create a new project",
    body: {
      name: "New Project",
      description: "Description here",
      stack: ["Next.js", "TypeScript", "Azure"]
    },
    response: {
      success: true,
      message: "Project created",
      id: 3
    }
  },
  {
    method: "GET",
    path: "/api/v1/analytics",
    description: "Get platform analytics",
    response: {
      success: true,
      data: {
        totalUsers: 1650,
        activeProjects: 2,
        uptime: "99.98%",
        avgResponseTime: "45ms"
      }
    }
  },
  {
    method: "POST",
    path: "/api/auth/login",
    description: "Authenticate user",
    body: {
      email: "user@example.com",
      password: "********"
    },
    response: {
      success: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      user: { id: 1, email: "user@example.com" }
    }
  }
];

export function ApiDocsPreview() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const endpoint = endpoints[selectedEndpoint];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Left: Endpoint List */}
      <div className="space-y-3">
        {endpoints.map((ep, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedEndpoint(index)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedEndpoint === index
                ? "border-brand bg-brand/5"
                : "border-border bg-panel hover:border-brand/50"
            }`}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span
                className={`px-2 py-1 text-xs font-bold rounded ${
                  ep.method === "GET"
                    ? "bg-green-500/20 text-green-400"
                    : ep.method === "POST"
                    ? "bg-brand/20 text-brand"
                    : "bg-accent/20 text-accent"
                }`}
              >
                {ep.method}
              </span>
              <code className="text-sm text-text font-mono">{ep.path}</code>
            </div>
            <p className="text-xs text-muted mt-2">{ep.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Right: Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedEndpoint}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <GlowCard className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-3 py-1 text-sm font-bold rounded ${
                  endpoint.method === "GET"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-brand/20 text-brand"
                }`}
              >
                {endpoint.method}
              </span>
              <code className="text-lg text-text font-mono">{endpoint.path}</code>
            </div>

            <p className="text-muted mb-6">{endpoint.description}</p>

            {endpoint.body && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-text">Request Body</h4>
                  <button
                    onClick={() => handleCopy(JSON.stringify(endpoint.body, null, 2), 1)}
                    className="text-xs text-brand hover:text-brand2 transition-colors"
                  >
                    {copiedIndex === 1 ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="bg-bg border border-border rounded-lg p-4 text-xs text-text overflow-x-auto">
                  {JSON.stringify(endpoint.body, null, 2)}
                </pre>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-text">Response</h4>
                <button
                  onClick={() => handleCopy(JSON.stringify(endpoint.response, null, 2), 2)}
                  className="text-xs text-brand hover:text-brand2 transition-colors"
                >
                  {copiedIndex === 2 ? "Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-bg border border-border rounded-lg p-4 text-xs text-green-400 overflow-x-auto">
                {JSON.stringify(endpoint.response, null, 2)}
              </pre>
            </div>

            <div className="mt-6 p-4 bg-brand/5 border border-brand/20 rounded-lg">
              <p className="text-xs text-muted">
                <strong className="text-brand">Authentication:</strong> All endpoints require a valid JWT token in the Authorization header.
              </p>
            </div>
          </GlowCard>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
