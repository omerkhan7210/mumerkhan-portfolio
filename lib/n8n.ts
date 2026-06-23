export async function notifyLeadWebhook(payload: Record<string, unknown>) {
  const url = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!url) return;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    console.error('n8n lead webhook failed:', err);
  }
}
