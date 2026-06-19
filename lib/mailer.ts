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
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
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
    from: opts.from ?? `"Umer Khan" <${process.env.SALES_EMAIL}>`,
    to: opts.to,
    replyTo: opts.replyTo,
    subject: opts.subject,
    html: opts.html,
  });
}
