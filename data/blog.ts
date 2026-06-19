export type BlogPost = {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  coverGradient: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: 'wordpress-vs-custom-web-development',
    title: 'WordPress vs Custom Web Development: Which Is Right for Your Business?',
    seoTitle: 'WordPress vs Custom Web Development: Which Should You Choose? | Umer Khan',
    seoDescription:
      'Wondering whether to build your website on WordPress or go fully custom? An honest breakdown of cost, flexibility, maintenance, and when each makes sense.',
    excerpt:
      'WordPress powers 43% of the internet. Custom code powers the rest. Here\'s how to decide which camp your next project belongs in — without the agency sales pitch.',
    date: '2024-12-10',
    readTime: 7,
    category: 'Web Development',
    tags: ['WordPress', 'Web Development', 'Decision Making', 'CMS'],
    coverGradient: 'from-[#21759b] to-[#0A0A0A]',
    content: `
<p>Every week I get some version of the same question: <em>"Should I use WordPress or build something custom?"</em> It's a reasonable thing to wonder — and the honest answer is: it depends. Here's the framework I use to decide for clients.</p>

<h2>The case for WordPress</h2>

<p>WordPress has been around since 2003. That age is an asset, not a liability. It means there are plugins for almost everything, a massive hiring pool, and a CMS that non-technical people can actually use without breaking things.</p>

<p>When does WordPress win?</p>
<ul>
  <li><strong>Marketing sites and blogs:</strong> If your primary goal is publishing content and generating leads, WordPress is almost always the right tool. The CMS is mature, SEO plugins like Rank Math are excellent, and updates are straightforward.</li>
  <li><strong>E-commerce at moderate scale:</strong> WooCommerce handles 28% of all online stores. For catalogues under ~10,000 SKUs with standard checkout flows, it's robust and well-supported.</li>
  <li><strong>Tight budgets:</strong> A well-built WordPress site can be delivered faster and cheaper than a custom build doing the same job. If budget is a constraint, that matters.</li>
  <li><strong>Clients who need to self-manage:</strong> The Gutenberg editor is genuinely easy to use. If you need your marketing team to update pages without calling a developer, WordPress is the best answer on the market.</li>
</ul>

<h2>The case for custom development</h2>

<p>Custom development (React, Next.js, Node.js) isn't about prestige — it's about solving problems WordPress can't. Here's when it earns its cost:</p>

<ul>
  <li><strong>Complex user interactions:</strong> Real-time dashboards, multi-step configurators, collaborative tools, booking systems with dynamic logic — these fight against WordPress at every turn. A React app built for the job will be faster to build and more reliable to maintain.</li>
  <li><strong>Performance at scale:</strong> Heavily trafficked applications where milliseconds matter need fine-grained control over caching, rendering strategy, and database queries. WordPress's abstraction layers work against you here.</li>
  <li><strong>Unique UX requirements:</strong> If your competitive advantage is the product experience itself — the interaction model, the animation, the feel — you need code that bends to your design, not a theme that approximates it.</li>
  <li><strong>SaaS and subscription products:</strong> Any product where users have accounts, manage data, and pay recurring fees belongs in a purpose-built stack, not WordPress with a membership plugin bolted on.</li>
</ul>

<h2>The hybrid approach</h2>

<p>In practice, many projects benefit from combining both. Headless WordPress — where WordPress handles the CMS and a Next.js frontend renders the pages — gives you the editorial simplicity of WordPress with the performance and flexibility of custom code. It's more expensive to build but often the right call for growing companies.</p>

<h2>The honest verdict</h2>

<p>If your site is primarily a marketing tool, use WordPress. If your site <em>is</em> the product, go custom. If you're not sure, send me a message — I'll give you a straight answer, not one designed to sell you the more expensive option.</p>
    `,
  },
  {
    slug: 'what-is-n8n-automation',
    title: 'What Is n8n? The Automation Tool Saving Small Businesses Hours Every Week',
    seoTitle: 'What Is n8n Automation? A Practical Guide for Business Owners | Umer Khan',
    seoDescription:
      'n8n is a self-hosted workflow automation tool — a Zapier alternative you actually own. Learn what it does, what it costs, and what kinds of tasks it automates.',
    excerpt:
      'n8n is what Zapier wishes it was: open-source, self-hosted, and free of per-task pricing. Here\'s what it can do for your business in plain English.',
    date: '2024-11-22',
    readTime: 6,
    category: 'Automation',
    tags: ['n8n', 'Automation', 'Workflow', 'No-Code', 'Productivity'],
    coverGradient: 'from-[#ea4b71] to-[#0A0A0A]',
    content: `
<p>If you've heard of Zapier or Make (formerly Integromat), you already understand the concept behind n8n: connect different apps and make them talk to each other automatically. But n8n has one key difference that matters enormously for growing businesses: <strong>you own it</strong>.</p>

<h2>What exactly is n8n?</h2>

<p>n8n (pronounced "n-eight-n") is an open-source workflow automation tool. You install it on your own server, and it runs forever at the cost of the server — typically €5–15 per month on a basic VPS. There are no per-task fees, no escalating pricing tiers, no surprise bills at the end of the month.</p>

<p>Inside n8n, you build workflows using a drag-and-drop visual editor. Each workflow is a series of connected nodes — triggers, actions, conditions, loops. A simple example:</p>

<blockquote>When a new lead fills in a contact form → add them to HubSpot CRM → send a personalised welcome email → notify the sales team in Slack → create a follow-up task in Notion.</blockquote>

<p>That entire sequence runs automatically, every time, without anyone touching it.</p>

<h2>What can n8n actually automate?</h2>

<p>n8n has 400+ native integrations and can connect to any service with a REST API. Common workflows I build for clients include:</p>

<ul>
  <li><strong>Lead handling:</strong> Contact form → CRM entry → assigned to sales rep → welcome email sent → calendar invite created</li>
  <li><strong>Client onboarding:</strong> Contract signed → project folder created in Google Drive → onboarding email sequence triggered → client added to Slack channel</li>
  <li><strong>Reporting:</strong> Every Monday at 9am → pull last week's sales data from WooCommerce → format into a summary → send to management Slack channel</li>
  <li><strong>Invoice processing:</strong> Invoice paid → update Airtable → mark project complete → request Google review from client</li>
  <li><strong>Social media:</strong> New blog post published → auto-post to LinkedIn and Twitter with custom formatting</li>
</ul>

<h2>Why not just use Zapier?</h2>

<p>Zapier is excellent and the right choice for businesses running a handful of simple automations. But Zapier's pricing scales with task volume — at 50,000+ tasks per month you're looking at $100–500/month or more. n8n on a €10 VPS handles millions of tasks for the same flat cost.</p>

<p>Beyond price, n8n gives you something Zapier doesn't: full visibility and control over your data. Every automation runs on your own infrastructure. For businesses in regulated industries or with strict data policies, that's often a requirement, not a preference.</p>

<h2>Is it hard to use?</h2>

<p>n8n's visual editor is genuinely intuitive for anyone comfortable with basic software tools. The complexity comes in writing the business logic — conditional branches, error handling, data transformation. That's where most businesses benefit from having someone build the initial workflows, after which their own team can monitor and make minor edits.</p>

<p>If you have manual processes eating hours of your team's time every week, n8n is almost certainly worth investigating. Feel free to <a href="/contact">get in touch</a> — I'm happy to look at your current process and tell you whether automation makes sense.</p>
    `,
  },
  {
    slug: 'why-your-website-is-losing-you-clients',
    title: "Why Your Website Is Quietly Losing You Clients (And the Fixes That Actually Work)",
    seoTitle: 'Why Your Website Is Losing You Clients — And How to Fix It | Umer Khan',
    seoDescription:
      'Most business websites are actively costing their owners money. Here are the five most common website problems that lose clients, and how to fix them.',
    excerpt:
      'Your website might look fine to you — but to potential clients, it might be sending all the wrong signals. Here are the silent conversion killers I see in almost every audit.',
    date: '2024-11-05',
    readTime: 8,
    category: 'Strategy',
    tags: ['Website Strategy', 'Conversion', 'UX', 'Performance', 'SEO'],
    coverGradient: 'from-[#f59e0b] to-[#0A0A0A]',
    content: `
<p>In the past few years I've audited dozens of small business websites. The owners almost always say the same thing: <em>"I get visitors, but they don't convert."</em> After enough of these audits, patterns emerge. Here are the five problems I find in nearly every case.</p>

<h2>1. It loads slowly — and you've stopped noticing</h2>

<p>Google has published research showing that 53% of mobile users abandon a page that takes longer than 3 seconds to load. But the bigger problem is that you, as the owner, have been looking at your own site for years. Your browser has it cached. You don't experience the load time a first-time visitor does.</p>

<p>Run your site through <a href="https://pagespeed.web.dev" target="_blank" rel="noopener noreferrer">Google PageSpeed Insights</a> right now. If your mobile score is below 70, you have a problem. Common causes: unoptimised images (fix: convert to WebP, add width/height attributes), too many plugins (fix: audit and remove what you don't use), no caching layer (fix: add WP Rocket or similar), unminified CSS/JS.</p>

<h2>2. The headline says what you do, not what the client gets</h2>

<p>"Digital Marketing Agency" is a headline. "More bookings for your restaurant, guaranteed" is a value proposition. The first describes you; the second describes the outcome the client wants.</p>

<p>Most business websites lead with the company's identity. But visitors don't care about you yet — they care about whether you can solve their problem. Review your homepage headline. If it would still be accurate if your competitor used it, it's not specific enough.</p>

<h2>3. There's no obvious next step</h2>

<p>You'd be surprised how many business websites make it genuinely unclear what a visitor should do next. Multiple competing calls to action. No CTA at all. A contact form buried in the footer. A "Learn More" button that goes to a page with another "Learn More" button.</p>

<p>Every page should have one primary action you want the visitor to take. Everything else is secondary. Make that primary action easy to find, visually distinct, and use specific language: "Book a free 30-minute call" outperforms "Get in touch" every time.</p>

<h2>4. The mobile experience is an afterthought</h2>

<p>Over 60% of web traffic is on mobile. Yet many websites were designed desktop-first and "made responsive" as an afterthought — which usually means elements are technically not overlapping, but the experience is awkward. Text too small to read without zooming, buttons too small to tap accurately, forms that span the full width of a 375px screen.</p>

<p>Test your site on an actual phone, not a browser's mobile emulator. The experience is different. Recruit someone who's never seen it and watch them try to complete a simple task — the friction points will become obvious immediately.</p>

<h2>5. You have no social proof above the fold</h2>

<p>Trust is the primary conversion variable for service businesses. Visitors have no prior relationship with you and no way to verify your claims. Social proof — testimonials, client logos, case studies, review scores — does the verification for them.</p>

<p>The mistake is burying social proof at the bottom of the page, where only visitors who are already convinced will see it. Your strongest testimonial or client logo bar should appear in the first screen — before the visitor decides whether to keep reading.</p>

<h2>What to do next</h2>

<p>Pick one of these five problems and fix it this week. You don't need a full rebuild. Conversion improvements compound — fixing your load time and your headline is often enough to meaningfully shift enquiry volume. If you want a proper audit, <a href="/contact">get in touch</a> and I'll take a look.</p>
    `,
  },
  {
    slug: 'how-much-does-a-website-cost',
    title: 'How Much Does a Professional Website Cost in 2024? Real Numbers',
    seoTitle: 'How Much Does a Professional Website Cost in 2024? | Umer Khan',
    seoDescription:
      'Transparent website pricing in 2024. From a simple landing page to a full e-commerce store — what you should actually expect to pay, and why prices vary so much.',
    excerpt:
      'Website pricing is notoriously opaque. Quotes range from $200 to $20,000 for "the same thing." Here\'s what actually drives cost, and what you should expect to pay.',
    date: '2024-10-18',
    readTime: 9,
    category: 'Pricing',
    tags: ['Website Cost', 'Pricing', 'Budget', 'Web Development'],
    coverGradient: 'from-[#10b981] to-[#0A0A0A]',
    content: `
<p>The most common question I get before a project quote: <em>"How much does a website actually cost?"</em> Prices online range from $200 on Fiverr to $50,000 from a digital agency — for what sounds like the same deliverable. Here's what's actually going on.</p>

<h2>Why prices vary so wildly</h2>

<p>A website is not a commodity. The same brief — "I need a website for my consultancy" — can result in a template with some text swapped out, or a fully custom-designed, performance-optimised site with integrated lead tracking and automation. The difference in outcome is enormous, and the difference in cost reflects that.</p>

<p>The main factors that drive cost are:</p>
<ul>
  <li><strong>Custom design vs template:</strong> A unique Figma design takes 15–30 hours. A premium theme costs $50. Both can look professional, but one is yours and one looks like 10,000 other sites.</li>
  <li><strong>Number of pages and content complexity:</strong> A 5-page marketing site and a 50-page site with case studies, blog, team directory, and resources are not the same project.</li>
  <li><strong>Custom functionality:</strong> Booking systems, membership portals, complex filtering, API integrations — each adds significant development hours.</li>
  <li><strong>E-commerce:</strong> WooCommerce for 20 products vs a 5,000-SKU store with inventory sync and multiple payment gateways are completely different scopes.</li>
  <li><strong>Ongoing support and maintenance:</strong> A project with a 12-month support retainer naturally costs more upfront than a once-off handoff.</li>
</ul>

<h2>Real price ranges in 2024</h2>

<p>Here's what you should expect to pay from a competent freelance developer:</p>

<h3>Landing page / simple portfolio ($300–600)</h3>
<p>1–3 pages, template-based or lightly customised, basic contact form. Suitable for freelancers or very early-stage businesses. Fast turnaround (3–5 days). SEO basics included. No CMS — content updates require a developer.</p>

<h3>Marketing website — 5–10 pages ($600–1,500)</h3>
<p>Custom design, WordPress CMS, mobile-responsive, contact forms, basic SEO, Google Analytics. Suitable for most small businesses. Typical turnaround: 2–3 weeks.</p>

<h3>Business website with custom functionality ($1,500–3,500)</h3>
<p>Custom design, advanced CMS, booking systems, calculators, API integrations, multi-location content. Suitable for growing businesses with specific operational needs.</p>

<h3>E-commerce store ($2,000–5,000+)</h3>
<p>WooCommerce, custom product pages, payment gateways, inventory management, order emails, and basic analytics. Price scales with catalogue size and checkout complexity.</p>

<h3>Custom web application ($5,000+)</h3>
<p>React/Node.js, user authentication, database design, admin dashboard. Priced by the feature list — a simple CRUD app might be $5K; a full SaaS product with subscriptions and multi-tenancy is a 6-figure engagement.</p>

<h2>The agency markup</h2>

<p>A digital agency will quote you 3–5x a freelancer's price for the same deliverable. You're paying for account management, project management, redundancy (multiple people who can take over if someone leaves), and the agency's margin. For large organisations where that accountability matters, it's worth it. For a small business, you're often paying for overhead you don't need.</p>

<h2>What you should actually do</h2>

<p>Write a clear brief: how many pages, what functionality, what platform (or leave it open), what your timeline is, and what outcome you're aiming for. Get 3 quotes. Be suspicious of very low quotes (you'll end up paying again to fix it) and very high ones (you're probably paying for overhead). The middle of the market, from a developer with a strong portfolio and clear reviews, is where good value lives.</p>

<p>My own pricing is visible on the <a href="/pricing">pricing page</a>. If your project doesn't fit a template, I'm happy to scope it properly on a call.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
