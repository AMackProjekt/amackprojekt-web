import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { ok } from "../../shared/http";

export async function healthz(req: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log("healthz check");
  return ok({ status: "ok" });
}

app.http("healthz", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "healthz",
  handler: healthz
});
