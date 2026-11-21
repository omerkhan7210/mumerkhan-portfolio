/* Returns true only when the webhook accepted the lead. */
export async function notifyLeadWebhook(payload: Record<string, unknown>): Promise<boolean> {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error('n8n lead webhook returned', res.status);
    return res.ok;
  } catch (err) {
    console.error('n8n lead webhook failed:', err);
    return false;
  }
}
