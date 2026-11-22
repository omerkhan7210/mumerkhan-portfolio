import projects from '@/data/projects.json';
import { services } from '@/data/services';
import { posts } from '@/data/blog';

/* llms.txt (https://llmstxt.org) built from the same data as the site,
   so AI assistants always see every post, service and case study. */
export const SITE = 'https://mumerkhan.com';

const INTRO = `# Muhammad Umer Khan

> Freelance web developer (Karachi, Pakistan) building WordPress, Elementor, WooCommerce and Next.js websites and n8n automations for small and mid-sized businesses in the US, UK, EU and Australia. 6+ years of experience, 80+ completed projects, 100% Job Success Score and 5.0 rating on Upwork. Works directly with clients as a freelancer, not an agency, with fixed-price quotes.

Also builds websites for trade and local service businesses (roofing, HVAC, plumbing, landscaping, flooring) with quote paths, job galleries and local service pages. Contact: umer@mumerkhan.com or https://mumerkhan.com/contact`;

const PROFILES = `## Profiles

- [Upwork](https://www.upwork.com/freelancers/muhammadumerk5)
- [LinkedIn](https://www.linkedin.com/in/muhammad-umer-khan-7998a8266)
- [GitHub](https://github.com/omerkhan7210)
- [Clutch](https://clutch.co/profile/muhammad-umer-khan)
- [Dev.to](https://dev.to/omer_khan_846c4feb067c59e)
- [Medium](https://medium.com/@omerfarooqkhan7210)`;

const sorted = () => [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));

export function buildLlmsTxt() {
  return [
    INTRO,
    `## Services\n\n${services.map((s) => `- [${s.name}](${SITE}/services/${s.slug}): ${s.tagline}`).join('\n')}\n- [Trade & local service websites](${SITE}/redesign): Websites for roofing, HVAC, plumbing and other trades, with a free homepage concept.`,
    `## Key pages\n\n- [Pricing](${SITE}/pricing): Fixed-price website packages and add-ons.\n- [Work](${SITE}/work): ${projects.length} case studies.\n- [About](${SITE}/about): Background and how projects run.\n- [Contact](${SITE}/contact): Project enquiry form; replies within four hours on weekdays.\n- [Website Cost Calculator](${SITE}/tools/website-cost-calculator): Instant price-range estimate.\n- [Automation ROI Calculator](${SITE}/tools/automation-roi-calculator): Time and cost saved by automating a process.\n- [Full text for AI assistants](${SITE}/llms-full.txt): Every article and service FAQ as plain text.`,
    `## Articles\n\n${sorted().map((p) => `- [${p.seoTitle}](${SITE}/blog/${p.slug}): ${p.seoDescription}`).join('\n')}`,
    `## Case studies\n\n${projects.map((p) => `- [${p.title}](${SITE}/work/${p.slug}) (${p.category}, ${p.year}): ${p.description}`).join('\n')}`,
    PROFILES,
  ].join('\n\n') + '\n';
}

/* Minimal HTML → Markdown for article bodies. */
function toMarkdown(html: string) {
  return html
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g, (_, href: string, text: string) => `[${text}](${href.startsWith('/') ? SITE + href : href})`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n### $1\n')
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/g, '- $1\n')
    .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/g, (_, row: string) => '| ' + row.replace(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g, '$1 | ').trim() + '\n')
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, '*$2*')
    .replace(/<\/p>/g, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&rsquo;/g, "'").replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function buildLlmsFullTxt() {
  const svc = services
    .map((s) => `## ${s.name}\n\nURL: ${SITE}/services/${s.slug}\n\n${s.tagline}\n\n${s.faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}`)
    .join('\n\n---\n\n');
  const art = sorted()
    .map((p) => `## ${p.title}\n\nURL: ${SITE}/blog/${p.slug}\nPublished: ${p.date}\nAuthor: Muhammad Umer Khan\n\n${p.excerpt}\n\n${toMarkdown(p.content)}`)
    .join('\n\n---\n\n');
  return `${INTRO}\n\n# Services and FAQs\n\n${svc}\n\n# Articles\n\n${art}\n\n${PROFILES}\n`;
}
