const FILTERED = '[Filtered]';
const MAX_DEPTH = 32;

// The API issues JWTs with JSON object headers and payloads, both encoded with an eyJ prefix.
const TOKEN_PATTERN = /eyJ[\w-]+\.eyJ[\w-]+\.[\w-]*/g;
// Guest game capabilities are Django-signed JSON UUID strings: 51 base64url characters, timestamp, HMAC.
const GUEST_TOKEN_PATTERN = /I[A-Za-z0-9_-]{50}:[A-Za-z0-9]+:[A-Za-z0-9_-]{43}/g;
const SECRET_KEYS = new Set([
  'accesstoken',
  'authorization',
  'guesttoken',
  'refreshtoken',
  'secwebsocketprotocol',
  'token',
  'xguesttoken',
]);

const isSecretKey = (key: string): boolean => SECRET_KEYS.has(key.replace(/[^a-z]/gi, '').toLowerCase());

const hideString = (value: string): string =>
  value.replace(TOKEN_PATTERN, FILTERED).replace(GUEST_TOKEN_PATTERN, FILTERED);

const hide = (value: unknown, depth: number, ancestors: WeakSet<object>): unknown => {
  if (typeof value === 'string') return hideString(value);
  if (typeof value === 'function') return FILTERED;
  if (typeof value !== 'object' || value === null) return value;
  if (depth >= MAX_DEPTH || ancestors.has(value)) return FILTERED;

  // Telemetry should contain serializable data. Preserve dates, but do not let opaque objects or binary payloads
  // bypass redaction through their own serialization behavior.
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : Date.prototype.toISOString.call(value);
  const prototype = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) return FILTERED;

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      if (value.length === 2 && typeof value[0] === 'string' && isSecretKey(value[0])) {
        return [hideString(value[0]), FILTERED];
      }
      const items = value.map((item) => hide(item, depth + 1, ancestors));
      return items.some((item, index) => item !== value[index]) ? items : value;
    }

    const object = value as Record<string, unknown>;
    const keys = Object.keys(object);
    const entries = keys.map((key) => {
      const item = object[key];
      const secret = isSecretKey(key);
      const filtered = secret && item !== null && item !== undefined ? FILTERED : hide(item, depth + 1, ancestors);
      return [hideString(key), filtered] as const;
    });
    return entries.some(([key, item], index) => key !== keys[index] || item !== object[key])
      ? Object.fromEntries(entries)
      : value;
  } finally {
    ancestors.delete(value);
  }
};

/** Redacts telemetry without changing the application's live credentials or Redux state. */
export const hideTokens = <T>(value: T): T => hide(value, 0, new WeakSet()) as T;
