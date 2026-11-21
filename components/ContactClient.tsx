'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

/* Same payload as before ({ service, followUp, budget, name, email, details } → /api/contact),
   in four steps instead of six: the three choices, then one short contact step. */
type FormData = {
  service: string;
  followUp: string;
  budget: string;
  name: string;
  email: string;
  details: string;
};

const SERVICES = ['New Website', 'Redesign', 'E-Commerce', 'Automation', 'Full Stack App', 'Not sure yet'];

const FOLLOW_UPS: Record<string, { question: string; hint: string; options: string[] }> = {
  'New Website': { question: 'How many pages do you need?', hint: 'A rough count is fine.', options: ['1–5 pages', '6–15 pages', '16+ pages', 'Not sure yet'] },
  Redesign: { question: 'What’s driving the redesign?', hint: 'The reason shapes the whole approach.', options: ['Outdated look', 'It’s too slow', 'Need a CMS', 'Bad on mobile', 'Something else'] },
  'E-Commerce': { question: 'How many products?', hint: 'Catalogue size changes the setup I’d recommend.', options: ['Under 50', '50–500', '500+', 'Not sure yet'] },
  Automation: { question: 'What do you want to automate?', hint: 'This decides the tools and integrations.', options: ['Lead / CRM workflows', 'Internal reporting', 'Document processing', 'Something else'] },
  'Full Stack App': { question: 'What kind of app is it?', hint: 'Auth, database and hosting all depend on this.', options: ['Internal tool', 'Customer-facing product', 'Marketplace / two-sided', 'Something else'] },
  'Not sure yet': { question: 'What’s prompting you to reach out?', hint: 'No need to have it figured out.', options: ['Just exploring options', 'I have a deadline', 'Replacing a developer', 'Something else'] },
};

const BUDGETS = ['Under $500', '$500–$2k', '$2k–$5k', '$5k+'];
const STEPS = 4;

export default function ContactClient() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({ service: '', followUp: '', budget: '', name: '', email: '', details: '' });
  const headRef = useRef<HTMLDivElement>(null);

  const go = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => headRef.current?.focus());
  };
  const pick = (patch: Partial<FormData>) => {
    setForm((f) => ({ ...f, ...patch }));
    setTimeout(() => go(step + 1), 140);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.includes('@')) {
      setError('Please add your name and a valid email.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);
      (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event: 'contact_submit', service: form.service, budget: form.budget });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-6" role="status">
        <p className="text-bone font-medium" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}>
          Thanks, {form.name.split(' ')[0] || 'there'}. It’s on its way.
        </p>
        <p className="mt-4 text-[18px] max-w-[46ch] text-bone">
          I’ll read your project details and reply within four hours on weekdays, usually with a first plan and a price range.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/work" className="btn-lime">Browse case studies</Link>
          <Link href="/" className="btn-outline">Back to home</Link>
        </div>
      </div>
    );
  }

  const follow = FOLLOW_UPS[form.service] ?? FOLLOW_UPS['Not sure yet'];
  const q =
    step === 0
      ? { title: 'What are you looking to build?', hint: 'Pick the closest. We can refine it on the call.' }
      : step === 1
        ? { title: follow.question, hint: follow.hint }
        : step === 2
          ? { title: 'What’s your budget range?', hint: 'A rough range is fine. It helps me suggest the right approach.' }
          : { title: 'Where should I reply?', hint: 'Add anything useful: timeline, goals, links to sites you like.' };

  const options = step === 0 ? SERVICES : step === 1 ? follow.options : step === 2 ? BUDGETS : [];
  const chosen = step === 0 ? form.service : step === 1 ? form.followUp : form.budget;

  return (
    <div>
      <div className="h-1 w-full" style={{ background: 'var(--surface-2)' }} aria-hidden="true">
        <div className="h-full transition-[width] duration-500" style={{ width: `${((step + 1) / STEPS) * 100}%`, background: 'var(--accent)', transitionTimingFunction: 'var(--ease-out)' }} />
      </div>
      <div ref={headRef} tabIndex={-1} className="outline-none mt-6">
        <h2 className="text-bone font-medium" style={{ fontSize: 'clamp(1.6rem, 2.6vw, 2.25rem)', lineHeight: 1.15 }}>{q.title}</h2>
        <p className="mt-2 text-[16px]" style={{ color: 'var(--muted)' }}>
          {q.hint} <span className="whitespace-nowrap">(Question {step + 1} of {STEPS}{form.service && step > 0 ? `, ${form.service}` : ''})</span>
        </p>
      </div>

      {step < 3 ? (
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label={q.title}>
          {options.map((o) => {
            const on = chosen === o;
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() =>
                  pick(step === 0 ? { service: o, followUp: '' } : step === 1 ? { followUp: o } : { budget: o })
                }
                className="min-h-[56px] px-5 text-left text-[17px] transition-colors duration-200 hover:bg-[#2c3734] active:scale-[0.99]"
                style={{ background: on ? 'var(--accent)' : 'var(--surface)', color: on ? 'var(--accent-ink)' : 'var(--ink)' }}
              >
                {o}
              </button>
            );
          })}
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="grid gap-1.5 text-[15px]" style={{ color: 'var(--muted)' }}>
              Name
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-14 px-4 text-[17px] text-bone"
                style={{ background: 'var(--surface)', border: '1px solid #33403C' }}
              />
            </label>
            <label className="grid gap-1.5 text-[15px]" style={{ color: 'var(--muted)' }}>
              Email
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-14 px-4 text-[17px] text-bone"
                style={{ background: 'var(--surface)', border: '1px solid #33403C' }}
              />
            </label>
          </div>
          <label className="grid gap-1.5 text-[15px]" style={{ color: 'var(--muted)' }}>
            Project details (optional)
            <textarea
              rows={5}
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              placeholder={`Your ${form.service.toLowerCase() || 'project'}${form.followUp ? `, ${form.followUp.toLowerCase()}` : ''}: timeline, goals, sites you like…`}
              className="px-4 py-3 text-[17px] text-bone resize-y placeholder:text-[#8E948D]"
              style={{ background: 'var(--surface)', border: '1px solid #33403C' }}
            />
          </label>
          {error && <p className="text-[15px]" style={{ color: '#F2A7A0' }} role="alert">{error}</p>}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <button type="submit" disabled={submitting} className="btn-lime disabled:opacity-60">
              {submitting ? 'Sending…' : 'Send my project'}
            </button>
            <span className="text-[14px]" style={{ color: 'var(--muted)' }}>No spam, no newsletter. Just a reply from me.</span>
          </div>
        </form>
      )}

      {step > 0 && (
        <button type="button" onClick={() => go(step - 1)} className="mt-6 text-[15px] text-bone underline underline-offset-4 hover:text-jade">
          Back
        </button>
      )}
    </div>
  );
}
