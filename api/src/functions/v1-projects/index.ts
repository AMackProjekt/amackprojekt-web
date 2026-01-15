import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok, fail } from "../../shared/http";

// Temporary in-memory store for local dev (replace with Cosmos/SQL/Postgres)
const projects: { id: string; name: string; createdAt: string }[] = [];

export async function v1Projects(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const method = req.method?.toUpperCase();

  if (method === "GET") {
    return ok({ items: projects });
  }

  if (method === "POST") {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return fail("invalid_json", "Request body must be valid JSON.", 400);
    }

    const name = (body?.name ?? "").toString().trim();
    if (!name) return fail("validation_error", "Field 'name' is required.", 422);

    const item = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() };
    projects.unshift(item);
    context.log('created project ' + item.id);
    return ok(item, 201);
  }

  return fail("method_not_allowed", "Unsupported method.", 405);
}

app.http("v1-projects", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "v1/projects",
  handler: v1Projects
});
