import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok } from "../../shared/http";

export async function readyz(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  // Wire DB readiness checks later (Cosmos/SQL/Postgres)
  context.log("readyz check");
  return ok({ status: "ready" });
}

app.http("readyz", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "readyz",
  handler: readyz
});
