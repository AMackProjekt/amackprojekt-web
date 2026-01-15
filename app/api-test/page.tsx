"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ChatBot } from "@/components/ui/ChatBot";
import { CookieConsent } from "@/components/ui/CookieConsent";

type ApiStatus = {
  healthz: "loading" | "ok" | "error";
  readyz: "loading" | "ok" | "error";
};

type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export default function ApiTestPage() {
  const [status, setStatus] = useState<ApiStatus>({ healthz: "loading", readyz: "loading" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    checkHealth();
    fetchProjects();
  }, []);

  const checkHealth = async () => {
    try {
      const healthRes = await fetch("/api/healthz");
      const readyRes = await fetch("/api/readyz");
      setStatus({
        healthz: healthRes.ok ? "ok" : "error",
        readyz: readyRes.ok ? "ok" : "error"
      });
    } catch {
      setStatus({ healthz: "error", readyz: "error" });
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/v1/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.items || []);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/v1/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newProjectName })
      });

      if (res.ok) {
        setNewProjectName("");
        await fetchProjects();
      } else {
        const data = await res.json();
        setError(data.error?.message || "Failed to create project");
      }
    } catch (err) {
      setError("Network error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (s: string) => {
    if (s === "loading") return "text-muted";
    if (s === "ok") return "text-green-400";
    return "text-red-400";
  };

  const getStatusText = (s: string) => {
    if (s === "loading") return "Checking...";
    if (s === "ok") return "✓ Healthy";
    return "✗ Error";
  };

  return (
    <main className="min-h-screen bg-bg">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-dash-glow" />
      
      <Navbar />

      <section className="mx-auto max-w-container px-7 pt-24 pb-16">
        <SectionHeading
          eyebrow="Backend Integration"
          title="API Test Dashboard"
          subtitle="Test Azure Functions API endpoints integrated with Static Web Apps"
        />
      </section>

      {/* API Health Status */}
      <section className="mx-auto max-w-container px-7 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlowCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted uppercase tracking-wider">Health Check</div>
                <div className="text-lg font-extrabold tracking-tight mt-1">GET /api/healthz</div>
              </div>
              <div className={`text-2xl font-bold ${getStatusColor(status.healthz)}`}>
                {getStatusText(status.healthz)}
              </div>
            </div>
          </GlowCard>

          <GlowCard className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted uppercase tracking-wider">Readiness Check</div>
                <div className="text-lg font-extrabold tracking-tight mt-1">GET /api/readyz</div>
              </div>
              <div className={`text-2xl font-bold ${getStatusColor(status.readyz)}`}>
                {getStatusText(status.readyz)}
              </div>
            </div>
          </GlowCard>
        </div>
      </section>

      {/* Projects CRUD Demo */}
      <section className="mx-auto max-w-container px-7 py-20">
        <div className="mb-10">
          <h2 className="h2 text-center">Projects API Demo</h2>
          <p className="mt-4 text-center text-muted max-w-2xl mx-auto">
            Test the sample CRUD API at /api/v1/projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Project Form */}
          <GlowCard className="p-8">
            <h3 className="text-xl font-extrabold tracking-tight text-text mb-4">
              Create Project
            </h3>
            <form onSubmit={createProject} className="space-y-4">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-muted mb-2">
                  Project Name
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full rounded-lg bg-bg border border-border px-4 py-3 text-text placeholder:text-muted/50 focus:outline-none focus:border-brand"
                />
              </div>
              {error && (
                <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                  {error}
                </div>
              )}
              <Button 
                variant="primary" 
                className="w-full"
              >
                {loading ? "Creating..." : "Create Project"}
              </Button>
            </form>
            <div className="mt-6 text-xs text-muted font-mono">
              POST /api/v1/projects
            </div>
          </GlowCard>

          {/* Projects List */}
          <GlowCard className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-extrabold tracking-tight text-text">
                All Projects
              </h3>
              <button
                onClick={fetchProjects}
                className="text-sm text-brand hover:text-brand2 transition-colors"
              >
                Refresh
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {projects.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  No projects yet. Create one to get started!
                </div>
              ) : (
                projects.map((project) => (
                  <div
                    key={project.id}
                    className="glass rounded-lg p-4"
                  >
                    <div className="text-text font-semibold">{project.name}</div>
                    <div className="text-xs text-muted mt-1">
                      ID: {project.id.slice(0, 8)}...
                    </div>
                    <div className="text-xs text-muted/60 mt-1">
                      {new Date(project.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 text-xs text-muted font-mono">
              GET /api/v1/projects
            </div>
          </GlowCard>
        </div>
      </section>

      {/* API Documentation */}
      <section className="mx-auto max-w-container px-7 py-20">
        <GlowCard className="p-10">
          <h2 className="h2 mb-6 text-center">Available API Endpoints</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                method: "GET",
                path: "/api/healthz",
                description: "Health check endpoint - returns system status"
              },
              {
                method: "GET",
                path: "/api/readyz",
                description: "Readiness check endpoint - verifies backend is ready"
              },
              {
                method: "GET",
                path: "/api/v1/projects",
                description: "List all projects (in-memory storage for demo)"
              },
              {
                method: "POST",
                path: "/api/v1/projects",
                description: "Create a new project with { \"name\": \"Project Name\" }"
              }
            ].map((endpoint) => (
              <div key={endpoint.path} className="glass rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold ${
                    endpoint.method === "GET" ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {endpoint.method}
                  </span>
                  <div className="flex-1">
                    <div className="text-text font-mono text-sm">{endpoint.path}</div>
                    <div className="text-muted text-sm mt-1">{endpoint.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlowCard>
      </section>

      <ChatBot />
      <CookieConsent />
    </main>
  );
}
