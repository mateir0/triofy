import { CRM_ACCESS_COOKIE, CRM_COOKIE_MAX_AGE } from "@/lib/crm/constants";

const encoder = new TextEncoder();

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromBase64Url(base64Url: string): Uint8Array {
  const normalized = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 ? "=".repeat(4 - (normalized.length % 4)) : "";
  const binary = atob(`${normalized}${padding}`);
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function importSigningKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await importSigningKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export async function createCrmAccessToken(secret: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + CRM_COOKIE_MAX_AGE;
  const payload = String(expiresAt);
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifyCrmAccessToken(token: string | undefined, secret: string) {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expiresAt = Number.parseInt(payload, 10);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const key = await importSigningKey(secret);
  const signatureBytes = fromBase64Url(signature);

  return crypto.subtle.verify(
    "HMAC",
    key,
    signatureBytes as unknown as BufferSource,
    encoder.encode(payload) as unknown as BufferSource
  );
}

export async function isCrmRequestAuthorized(token: string | undefined) {
  const accessKey = process.env.CRM_ACCESS_KEY;
  if (!accessKey) return false;
  return verifyCrmAccessToken(token, accessKey);
}

export { CRM_ACCESS_COOKIE, CRM_COOKIE_MAX_AGE };
