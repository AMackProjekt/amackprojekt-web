// Opt-in Cloudflare Workers AI gateway. No routes or public access are enabled by default.
const MODEL = "@cf/meta/llama-3.1-8b-instruct";
const reply = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname === "/health") return reply({ ok: true, service: "project-ai-gateway", ready: Boolean(env.AI && env.GATEWAY_TOKEN) });
    if (url.pathname !== "/v1/chat") return reply({ ok: false, error: "Not found" }, 404);
    if (request.method !== "POST") return reply({ ok: false, error: "Method not allowed" }, 405);
    // Private server-to-server use only. Never embed the token in frontend JavaScript.
    if (!env.GATEWAY_TOKEN || request.headers.get("Authorization") !== "Bearer " + env.GATEWAY_TOKEN) return reply({ ok: false, error: "Unauthorized" }, 401);
    if (!env.AI) return reply({ ok: false, error: "AI binding unavailable" }, 503);
    if (Number(request.headers.get("Content-Length") || 0) > 4096) return reply({ ok: false, error: "Request too large" }, 413);
    let body;
    try { body = await request.json(); } catch { return reply({ ok: false, error: "Invalid JSON" }, 400); }
    if (typeof body?.prompt !== "string" || !body.prompt.trim() || body.prompt.length > 1500) return reply({ ok: false, error: "Invalid prompt" }, 400);
    // Only non-sensitive prompts should be sent here until project-specific privacy review.
    const messages = [
      { role: "system", content: "You are a helpful assistant. Do not request private client records, identifiers or medical details. Do not invent resources or claim verification you cannot perform." },
      { role: "user", content: body.prompt.trim() }
    ];
    try {
      const result = await env.AI.run(MODEL, { messages, max_tokens: 450 });
      if (typeof result?.response !== "string" || !result.response.trim()) throw new Error("Empty model response");
      return reply({ ok: true, reply: result.response, provider: "cloudflare-workers-ai" });
    } catch { return reply({ ok: false, error: "AI service temporarily unavailable" }, 503); }
  }
};
