import nodemailer from 'nodemailer';

declare global {
  // eslint-disable-next-line no-var
  var __mailTransport: nodemailer.Transporter | undefined;
}

export function getTransport() {
  if (!global.__mailTransport) {
    global.__mailTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      // SMTP_SECURE wins when set; otherwise implicit TLS only on port 465 (587 uses STARTTLS).
      secure: process.env.SMTP_SECURE
        ? process.env.SMTP_SECURE === 'true'
        : Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return global.__mailTransport;
}

export async function sendMail(opts: { to: string; from?: string; subject: string; html: string; replyTo?: string }) {
  const transport = getTransport();
  return transport.sendMail({
    // Hostinger only relays mail sent from the authenticated mailbox, so FROM_EMAIL comes first.
    from: opts.from ?? `"Umer Khan" <${process.env.FROM_EMAIL || process.env.SMTP_USER || process.env.SALES_EMAIL}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}
