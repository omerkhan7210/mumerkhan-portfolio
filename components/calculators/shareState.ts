/* Encodes calculator inputs into a URL-safe base64 query param so a
   result can be shared/reloaded without any backend — the receiving
   page just decodes `?s=` on mount and reconstructs the same state. */

export function encodeState(state: Record<string, unknown>): string {
  const json = JSON.stringify(state);
  return typeof window === 'undefined'
    ? Buffer.from(json).toString('base64url')
    : btoa(encodeURIComponent(json)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeState<T = Record<string, unknown>>(encoded: string): T | null {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(atob(base64));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
