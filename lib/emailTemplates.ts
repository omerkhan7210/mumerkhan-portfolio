export type ContactFormData = {
  service: string;
  followUp: string;
  budget: string;
  name: string;
  email: string;
  details: string;
};

const SITE_URL = 'https://mumerkhan.com';
const LIME = '#C8FF00';
const INK = '#0A0A0A';

/* All user-supplied form fields get interpolated into raw HTML below,
   so they must be escaped first to prevent HTML/markup injection in
   the rendered email. */
function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sanitizeForm(form: ContactFormData): ContactFormData {
  return {
    service: escapeHtml(form.service ?? ''),
    followUp: escapeHtml(form.followUp ?? ''),
    budget: escapeHtml(form.budget ?? ''),
    name: escapeHtml(form.name ?? ''),
    email: escapeHtml(form.email ?? ''),
    details: escapeHtml(form.details ?? '').replace(/\n/g, '<br/>'),
  };
}

/* Per-service reply content — this is what makes the auto-reply feel
   written for the specific thing the lead asked about, instead of a
   generic "thanks for reaching out" template. */
const SERVICE_REPLY: Record<
  string,
  { emoji: string; headline: string; body: string; steps: string[]; ctaLabel: string; ctaHref: string }
> = {
  'New Website': {
    emoji: '🌐',
    headline: "Let's get your new website moving.",
    body:
      "Building from scratch means we get to do this right from day one — no legacy code, no compromises. I'll put together a short discovery brief so we can lock in pages, structure, and the look before a single line of code gets written.",
    steps: [
      'I review what you shared and reply within 4 hours with initial thoughts',
      "We hop on a free 20-minute call to nail down scope and timeline",
      "You get a fixed-price quote — no surprises, no scope creep",
    ],
    ctaLabel: 'See pricing tiers',
    ctaHref: `${SITE_URL}/pricing`,
  },
  Redesign: {
    emoji: '✦',
    headline: "Let's fix what's holding your site back.",
    body:
      "Most redesigns fail because they change the visuals but not the underlying problem. Before we touch a pixel, I'll take a quick look at your current site so the redesign actually solves what's costing you conversions.",
    steps: [
      "I take a first look at your current site before we talk",
      'We discuss what specifically needs to change, and why',
      'You get a clear before/after plan with a fixed quote',
    ],
    ctaLabel: 'See redesign work',
    ctaHref: `${SITE_URL}/work`,
  },
  'E-Commerce': {
    emoji: '🛒',
    headline: "Let's get your store selling.",
    body:
      "E-commerce projects live or die on the details — checkout flow, payment gateways, inventory sync. I'll ask a few questions about your catalogue so the platform choice fits your actual scale, not a generic template.",
    steps: [
      'I review your catalogue size and payment needs',
      'We map out the storefront and checkout flow together',
      'You get a scoped quote with a realistic launch date',
    ],
    ctaLabel: 'View e-commerce service',
    ctaHref: `${SITE_URL}/services/ecommerce-development`,
  },
  Automation: {
    emoji: '⚡',
    headline: "Let's get that manual work off your plate.",
    body:
      "Automation only pays off when it's built around how your team actually works. I'll look at the workflow you described and figure out the cleanest way to wire it up with n8n — no duct tape, no fragile spreadsheets.",
    steps: [
      'I map your current process and flag the quick wins',
      'We agree on the exact workflow logic on a short call',
      'You get a working automation, tested before it goes live',
    ],
    ctaLabel: 'See automation service',
    ctaHref: `${SITE_URL}/services/n8n-automation`,
  },
  'Full Stack App': {
    emoji: '⬡',
    headline: "Let's talk through your product.",
    body:
      "Custom apps need a real technical conversation before any pricing makes sense — auth, data model, hosting all depend on what you're building. I'll come prepared with questions specific to the kind of app you described.",
    steps: [
      'I review your notes and prep technical questions',
      'We scope the architecture together on a call',
      'You get a phased build plan with milestone pricing',
    ],
    ctaLabel: 'View MERN stack service',
    ctaHref: `${SITE_URL}/services/mern-stack-development`,
  },
  'Not sure yet': {
    emoji: '?',
    headline: "No pressure — let's figure it out together.",
    body:
      "Not having it all figured out yet is completely normal, and honestly the best starting point — it means we can shape the project around what you actually need instead of a preconceived idea. Let's just talk it through.",
    steps: [
      "I read what you shared and come with a few framing questions",
      'We have a relaxed, no-commitment call about direction',
      "You walk away with clarity, even if we don't end up working together",
    ],
    ctaLabel: 'Browse all services',
    ctaHref: `${SITE_URL}/services`,
  },
};

export function wrapEmail(bodyHtml: string): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f2f1ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f1ec;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:${INK};padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display:inline-block;width:34px;height:34px;border-radius:8px;background:rgba(200,255,0,0.08);border:1px solid rgba(200,255,0,0.3);text-align:center;line-height:34px;font-weight:800;color:${LIME};font-size:13px;">UK</span>
                  </td>
                  <td align="right">
                    <span style="color:rgba(255,255,255,0.4);font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">mumerkhan.com</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ${bodyHtml}
          <tr>
            <td style="padding:24px 32px;background:#fafaf8;border-top:1px solid #ececec;">
              <p style="margin:0 0 4px;font-size:13px;color:#1a1a1a;font-weight:600;">Muhammad Umer Khan</p>
              <p style="margin:0 0 12px;font-size:12px;color:#888;">Full Stack Developer · Karachi, Pakistan</p>
              <p style="margin:0;font-size:11px;color:#aaa;">
                <a href="${SITE_URL}" style="color:#aaa;text-decoration:none;">mumerkhan.com</a> ·
                <a href="mailto:sales@mumerkhan.com" style="color:#aaa;text-decoration:none;">sales@mumerkhan.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyEmail(rawForm: ContactFormData): { subject: string; html: string } {
  /* Look up the template using the raw (unescaped) service value —
     escaping is only for what gets dropped into the HTML body. */
  const content = SERVICE_REPLY[rawForm.service] ?? SERVICE_REPLY['Not sure yet'];
  const form = sanitizeForm(rawForm);
  const firstName = form.name.trim().split(/\s+/)[0] || 'there';

  const body = `
          <tr>
            <td style="padding:36px 32px 8px;">
              <div style="font-size:34px;line-height:1;margin-bottom:16px;">${content.emoji}</div>
              <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:${INK};letter-spacing:-0.01em;">
                Hey ${firstName}, ${content.headline}
              </h1>
              <p style="margin:0 0 20px;font-size:14.5px;line-height:1.7;color:#444;">
                ${content.body}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${content.steps
                  .map(
                    (step, i) => `
                <tr>
                  <td style="padding:8px 0;vertical-align:top;width:32px;">
                    <span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:${LIME};color:${INK};font-size:11px;font-weight:800;text-align:center;line-height:22px;">${i + 1}</span>
                  </td>
                  <td style="padding:8px 0;vertical-align:top;">
                    <span style="font-size:13.5px;color:#333;line-height:1.5;">${step}</span>
                  </td>
                </tr>`,
                  )
                  .join('')}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f3;border-radius:10px;border:1px solid #eceae3;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0 0 6px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#999;">What you told me</p>
                    <p style="margin:0;font-size:13px;color:#444;line-height:1.6;">
                      <strong>${form.service}</strong>${form.followUp ? ` · ${form.followUp}` : ''}${form.budget ? ` · ${form.budget}` : ''}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 36px;">
              <a href="${content.ctaHref}" style="display:inline-block;background:${LIME};color:${INK};font-size:13.5px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:9px;">
                ${content.ctaLabel} →
              </a>
              <p style="margin:18px 0 0;font-size:12.5px;color:#999;line-height:1.6;">
                Just reply to this email if you want to add anything before we talk — I read every reply myself.
              </p>
            </td>
          </tr>`;

  return {
    subject: `Got it, ${firstName} — here's what happens next`,
    html: wrapEmail(body),
  };
}

export function buildLeadNotificationEmail(rawForm: ContactFormData): { subject: string; html: string } {
  const form = sanitizeForm(rawForm);
  const rows: [string, string][] = [
    ['Service', form.service || '—'],
    ['Follow-up', form.followUp || '—'],
    ['Budget', form.budget || '—'],
    ['Name', form.name],
    ['Email', form.email],
    ['Details', form.details || '—'],
  ];

  const body = `
          <tr>
            <td style="padding:32px 32px 8px;">
              <p style="margin:0 0 4px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:${LIME};font-weight:700;">New lead</p>
              <h1 style="margin:0 0 18px;font-size:20px;color:${INK};">${form.name} wants a ${form.service.toLowerCase() || 'project'}</h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${rows
                  .map(
                    ([label, value]) => `
                <tr>
                  <td style="padding:9px 0;border-top:1px solid #eee;width:120px;vertical-align:top;">
                    <span style="font-size:11.5px;color:#999;text-transform:uppercase;letter-spacing:0.04em;">${label}</span>
                  </td>
                  <td style="padding:9px 0;border-top:1px solid #eee;vertical-align:top;">
                    <span style="font-size:13.5px;color:#222;line-height:1.5;">${value}</span>
                  </td>
                </tr>`,
                  )
                  .join('')}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 36px;">
              <a href="mailto:${form.email}" style="display:inline-block;background:${LIME};color:${INK};font-size:13.5px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:9px;">
                Reply to ${form.name.split(/\s+/)[0]} →
              </a>
            </td>
          </tr>`;

  return {
    subject: `New lead: ${form.name} — ${form.service || 'General enquiry'}`,
    html: wrapEmail(body),
  };
}

/* ── Calculator result emails ──────────────────────────────────── */
export type CalculatorLeadData = {
  tool: 'Website Cost Calculator' | 'Automation ROI Calculator';
  email: string;
  resultHeadline: string;
  resultLines: string[];
  shareUrl: string;
};

export function buildCalculatorResultEmail(raw: CalculatorLeadData): { subject: string; html: string } {
  const email = escapeHtml(raw.email);
  const resultHeadline = escapeHtml(raw.resultHeadline);
  const resultLines = raw.resultLines.map(escapeHtml);
  const shareUrl = escapeHtml(raw.shareUrl);

  const body = `
          <tr>
            <td style="padding:36px 32px 8px;">
              <p style="margin:0 0 6px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#999;">${escapeHtml(raw.tool)}</p>
              <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;color:${INK};letter-spacing:-0.01em;">
                ${resultHeadline}
              </h1>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f3;border-radius:10px;border:1px solid #eceae3;">
                <tr>
                  <td style="padding:18px 20px;">
                    ${resultLines
                      .map(
                        (line) => `
                    <p style="margin:0 0 8px;font-size:13.5px;color:#333;line-height:1.6;">${line}</p>`,
                      )
                      .join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px;">
              <a href="${shareUrl}" style="display:inline-block;background:${LIME};color:${INK};font-size:13.5px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:9px;">
                View your full breakdown →
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 32px 36px;">
              <p style="margin:0;font-size:12.5px;color:#999;line-height:1.6;">
                Want to talk through the numbers? Just reply to this email, or
                <a href="${SITE_URL}/contact" style="color:#1a1a1a;">book a quick call</a>.
              </p>
            </td>
          </tr>`;

  return {
    subject: `Your ${raw.tool.toLowerCase()} results — ${email.split('@')[0]}`,
    html: wrapEmail(body),
  };
}

export function buildCalculatorLeadNotificationEmail(raw: CalculatorLeadData): { subject: string; html: string } {
  const email = escapeHtml(raw.email);
  const resultHeadline = escapeHtml(raw.resultHeadline);
  const resultLines = raw.resultLines.map(escapeHtml);
  const shareUrl = escapeHtml(raw.shareUrl);

  const body = `
          <tr>
            <td style="padding:36px 32px 8px;">
              <p style="margin:0 0 6px;font-size:10.5px;letter-spacing:0.08em;text-transform:uppercase;color:#999;">${escapeHtml(raw.tool)} lead</p>
              <h1 style="margin:0 0 14px;font-size:22px;line-height:1.3;color:${INK};letter-spacing:-0.01em;">
                ${email} requested their results
              </h1>
              <p style="margin:0 0 4px;font-size:14.5px;line-height:1.7;color:#444;">${resultHeadline}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f3;border-radius:10px;border:1px solid #eceae3;">
                <tr>
                  <td style="padding:14px 18px;">
                    ${resultLines
                      .map(
                        (line) => `
                    <p style="margin:0 0 6px;font-size:13px;color:#444;line-height:1.6;">${line}</p>`,
                      )
                      .join('')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 36px;">
              <a href="mailto:${email}" style="display:inline-block;background:${LIME};color:${INK};font-size:13.5px;font-weight:700;text-decoration:none;padding:12px 24px;border-radius:9px;">
                Reply to ${email} →
              </a>
              <p style="margin:14px 0 0;font-size:11.5px;color:#aaa;">
                <a href="${shareUrl}" style="color:#aaa;">View their exact inputs →</a>
              </p>
            </td>
          </tr>`;

  return {
    subject: `New ${raw.tool} lead: ${email}`,
    html: wrapEmail(body),
  };
}
