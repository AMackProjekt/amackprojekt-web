export type ErrorEnvelope = { error: { code: string; message: string; details?: unknown[] } };

export function ok(body: unknown, status = 200) {
  return {
    status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  };
}

export function fail(code: string, message: string, status = 400, details?: unknown[]) {
  const payload: ErrorEnvelope = { error: { code, message, details } };
  return {
    status,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  };
}
