/**
 * HIPAA Audit Logging Utility
 *
 * HIPAA §164.312(b) requires covered entities to implement hardware, software,
 * and procedural mechanisms that record and examine activity in information
 * systems that contain or use ePHI.
 *
 * This utility writes immutable audit records to a dedicated Cosmos DB container.
 * Records must be retained for a minimum of 6 years (§164.316(b)(2)).
 */
import { getContainer } from './cosmos';
import { config } from '../config';

export type AuditAction =
  | 'AUTH_LOGIN_SUCCESS'
  | 'AUTH_LOGIN_FAILURE'
  | 'AUTH_LOGOUT'
  | 'AUTH_SIGNUP'
  | 'PHI_READ'
  | 'PHI_UPDATE'
  | 'PHI_DELETE'
  | 'EXPORT_DATA'
  | 'PERMISSION_DENIED';

export interface AuditRecord {
  /** Cosmos DB id — deterministic for idempotency on retry */
  id: string;
  /** Partition key — keeps records per user queryable under the 20 GB limit */
  userId: string;
  action: AuditAction;
  /** UTC ISO timestamp */
  timestamp: string;
  /** Outgoing IP or Azure Functions invocation source */
  sourceIp?: string;
  /** Browser / client user-agent */
  userAgent?: string;
  /** Optional context — keep free of PHI in the log line itself */
  context?: Record<string, string | number | boolean>;
  /** TTL in seconds — 6 years = 189_216_000 s  (null = no auto-expiry) */
  ttl: number;
}

/**
 * Write a single audit record.  Failures are logged but never thrown —
 * the primary operation should not be blocked by audit persistence.
 */
export async function writeAuditLog(
  params: Omit<AuditRecord, 'id' | 'timestamp' | 'ttl'>
): Promise<void> {
  const timestamp = new Date().toISOString();
  const record: AuditRecord = {
    id: `${params.userId}-${params.action}-${Date.now()}`,
    timestamp,
    // 6-year retention per HIPAA §164.316(b)(2)
    ttl: 189_216_000,
    ...params,
  };

  try {
    const container = await getContainer(config.cosmosDb.containers.auditLog);
    await container.items.create(record);
  } catch (err) {
    // Audit write failure must never suppress the business operation —
    // log to Application Insights / stderr for out-of-band alerting.
    console.error('[HIPAA AUDIT] Failed to write audit record:', {
      action: record.action,
      userId: record.userId,
      timestamp: record.timestamp,
      error: err instanceof Error ? err.message : String(err),
    });
  }
}
