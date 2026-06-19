export type ServiceProcess = { step: string; title: string; desc: string };
export type ServiceFAQ = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  metaDescription: string;
  icon: string;
  color: string;
  tags: string[];
  hero: {
    heading: string;
    sub: string;
  };
  deliverables: string[];
  process: ServiceProcess[];
  technologies: string[];
  faqs: ServiceFAQ[];
};

export const services: Service[] = [
  {
    slug: 'wordpress-development',
    name: 'WordPress Development',
    tagline: 'Custom WordPress sites built for performance, SEO, and easy management.',
    metaDescription: 'Professional WordPress development by Umer Khan. Custom themes, WooCommerce stores, performance optimisation, plugin development. Based in Karachi, working worldwide.',
    icon: 'WP',
    color: '#21759b',
    tags: ['WordPress', 'WooCommerce', 'PHP', 'ACF', 'Elementor'],
    hero: {
      heading: 'WordPress That Actually Performs',
      sub: 'Bespoke WordPress builds — fast, secure, and easy to manage without a developer on call.',
    },
    deliverables: [
      'Custom theme built from scratch (no page-builder bloat)',
      'Mobile-first, responsive across all devices',
      'Core Web Vitals optimised (target 90+ Lighthouse)',
      'On-page SEO: meta tags, schema markup, sitemap',
      'Contact forms, lead capture & SMTP email setup',
      'Staging environment + version-controlled deployment',
      'Admin training: update content without touching code',
      '30-day post-launch support',
    ],
    process: [
      { step: '01', title: 'Discovery Call', desc: 'We scope your project, review existing brand assets, and agree on a site structure and timeline. No guesswork.' },
      { step: '02', title: 'Wireframe & Design', desc: 'I prototype the layout in Figma so you approve the look before a single line of code is written.' },
      { step: '03', title: 'Development', desc: 'Custom theme coding in PHP/HTML/CSS/JS. I build on a private staging URL so you can review progress live.' },
      { step: '04', title: 'Content & QA', desc: 'Populate all pages, run cross-browser and mobile testing, optimise images, and fix anything that feels off.' },
      { step: '05', title: 'Launch & Handoff', desc: 'DNS cutover, SSL certificate, Google Analytics, and a screen-recorded walkthrough of the CMS for your team.' },
    ],
    technologies: ['WordPress', 'PHP', 'WooCommerce', 'Advanced Custom Fields', 'MySQL', 'Git', 'Cloudflare'],
    faqs: [
      { q: 'Will I be able to edit the site myself?', a: 'Yes — every build gets a tailored admin setup and a screen-recorded tutorial. You\'ll be able to update text, images, and blog posts without touching code.' },
      { q: 'Do you use page builders like Elementor or Divi?', a: 'I avoid them for custom work because they add significant bloat. Most projects use a hand-coded theme with Advanced Custom Fields for flexible content management.' },
      { q: 'Can you migrate my existing WordPress site?', a: 'Absolutely. I handle full migrations including database, media files, redirects, and DNS changeover with zero downtime.' },
      { q: 'How long does a typical project take?', a: 'A standard 5–10 page marketing site takes 2–3 weeks. WooCommerce stores typically run 3–5 weeks depending on the product catalogue size.' },
      { q: 'Do you offer ongoing maintenance?', a: 'Yes — I offer monthly retainer plans covering WordPress core, plugin, and theme updates, plus security scans and uptime monitoring.' },
    ],
  },
  {
    slug: 'mern-stack-development',
    name: 'MERN Stack Development',
    tagline: 'Full-stack web applications built with MongoDB, Express, React, and Node.js.',
    metaDescription: 'Custom MERN stack web application development by Umer Khan. React frontends, Node.js APIs, MongoDB databases. SaaS platforms, dashboards, client portals. Worldwide.',
    icon: 'MERN',
    color: '#61DAFB',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Next.js'],
    hero: {
      heading: 'Web Apps That Scale With You',
      sub: 'From MVP to production — custom React/Node applications built with clean architecture and your growth in mind.',
    },
    deliverables: [
      'React (or Next.js) frontend with TypeScript',
      'Node.js / Express REST API with JWT authentication',
      'MongoDB database design and indexing strategy',
      'Role-based access control (admin, editor, viewer)',
      'Responsive UI built to your Figma designs',
      'API documentation (Postman collection)',
      'CI/CD pipeline and deployment to your server / cloud',
      'Source code with clear README and handoff docs',
    ],
    process: [
      { step: '01', title: 'Requirements Mapping', desc: 'We turn your idea into a feature list, data model, and API contract — so there\'s no ambiguity when we build.' },
      { step: '02', title: 'UI/UX Design', desc: 'Figma wireframes for every screen, mobile and desktop. Approved before development begins.' },
      { step: '03', title: 'Backend First', desc: 'I build and test the API layer with real data before touching the frontend — fewer surprises later.' },
      { step: '04', title: 'Frontend Build', desc: 'React UI built component-by-component against the live API. You can test each feature as it\'s completed.' },
      { step: '05', title: 'Deploy & Document', desc: 'Production deployment, environment setup, and handoff documentation so your team can own it going forward.' },
    ],
    technologies: ['React', 'Next.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS', 'Docker'],
    faqs: [
      { q: 'Do you build mobile apps too?', a: 'My primary focus is web applications. For mobile, I build progressive web apps (PWA) that work on every device. Native mobile (React Native) is available on request.' },
      { q: 'Can you build on top of an existing codebase?', a: 'Yes. I\'ll do a short code review first so I understand the architecture, then provide a clear estimate for the new features.' },
      { q: 'How do you handle authentication and security?', a: 'JWT-based authentication with refresh tokens, bcrypt password hashing, rate limiting, input validation, and HTTPS by default. I follow OWASP guidelines throughout.' },
      { q: 'What databases do you support?', a: 'MongoDB is my primary stack, but I also work with PostgreSQL and MySQL depending on your data structure and query patterns.' },
      { q: 'What if I need changes after launch?', a: 'All projects include 30 days of post-launch support for bug fixes. For ongoing feature development, we move to a sprint-based retainer.' },
    ],
  },
  {
    slug: 'n8n-automation',
    name: 'n8n Workflow Automation',
    tagline: 'Automate repetitive tasks and connect your tools — without expensive SaaS fees.',
    metaDescription: 'n8n automation workflows by Umer Khan. Self-hosted Zapier alternative. Automate lead capture, CRM sync, email sequences, reporting and more. No per-task pricing.',
    icon: 'n8n',
    color: '#ea4b71',
    tags: ['n8n', 'Zapier Alternative', 'API Integration', 'Webhooks', 'CRM'],
    hero: {
      heading: 'Stop Doing Work Your Computer Can Do',
      sub: 'Custom n8n workflows that connect your apps, automate your pipeline, and save your team hours every week.',
    },
    deliverables: [
      'Discovery session to map your current manual processes',
      'n8n instance setup (self-hosted or cloud) on your server',
      'Custom workflow build with error handling and retry logic',
      'Credentials management and secure API key storage',
      'Testing with real data across all edge cases',
      'Workflow documentation and maintenance guide',
      'Training call: your team can edit flows themselves',
      '14-day monitoring period post-launch',
    ],
    process: [
      { step: '01', title: 'Process Audit', desc: 'We map every manual step you currently do — spreadsheet updates, copy-paste between apps, email follow-ups — and prioritise by time saved.' },
      { step: '02', title: 'Architecture Design', desc: 'I design the workflow diagram before building, so you approve the logic and catch edge cases early.' },
      { step: '03', title: 'Build & Test', desc: 'Workflows are built modularly — each node is tested independently, then together, using real (or realistic) data.' },
      { step: '04', title: 'Error Handling', desc: 'Every production workflow gets error notifications, dead-letter queues, and automatic retries. Silent failures are not an option.' },
      { step: '05', title: 'Deploy & Train', desc: 'Live deployment to your environment, followed by a video walkthrough so your team can monitor and make minor edits.' },
    ],
    technologies: ['n8n', 'REST APIs', 'Webhooks', 'HubSpot', 'Airtable', 'Slack', 'Gmail', 'Notion', 'PostgreSQL'],
    faqs: [
      { q: 'Why n8n instead of Zapier or Make?', a: 'n8n is self-hosted — you own your data and pay a flat server cost, not a per-task fee. For businesses running thousands of automations per month, the savings are significant.' },
      { q: 'What tools can n8n connect to?', a: 'n8n has 400+ native integrations and can connect to any service with a REST API or webhook. If it has an API, n8n can talk to it.' },
      { q: 'I\'m not technical — will I be able to maintain it?', a: 'Yes. n8n has a visual drag-and-drop interface. I\'ll build the workflows and give you a walkthrough. Most clients can make minor edits within a day.' },
      { q: 'Do I need my own server?', a: 'You\'ll need a small VPS (€5–15/month on Hetzner or DigitalOcean). I handle the full server setup and n8n installation as part of the project.' },
      { q: 'What kinds of automations do you typically build?', a: 'Lead capture → CRM sync, sales pipeline updates, automated client onboarding emails, weekly reporting dashboards, social media scheduling, and invoice generation are the most common.' },
    ],
  },
  {
    slug: 'figma-to-web',
    name: 'Figma to Web',
    tagline: 'Pixel-perfect conversion from your Figma designs to production-ready code.',
    metaDescription: 'Figma to web development by Umer Khan. Pixel-perfect HTML/CSS/React implementation of your designs. Interactive prototypes, animations, and responsive layouts.',
    icon: 'F2W',
    color: '#a259ff',
    tags: ['Figma', 'React', 'HTML/CSS', 'Animation', 'Responsive'],
    hero: {
      heading: 'Your Design, Exactly as You Drew It',
      sub: 'Pixel-perfect Figma-to-code conversion — every spacing, shadow, and interaction faithfully reproduced in the browser.',
    },
    deliverables: [
      'Semantic HTML with accessible markup (WCAG AA)',
      'CSS/Tailwind matching your exact design tokens',
      'Interactive states: hover, focus, active, disabled',
      'Micro-interactions and animations (GSAP or Framer Motion)',
      'Fully responsive: mobile, tablet, desktop',
      'Cross-browser testing (Chrome, Firefox, Safari, Edge)',
      'Lighthouse score 90+ on performance, accessibility, SEO',
      'Clean, commented handoff-ready code',
    ],
    process: [
      { step: '01', title: 'Design Review', desc: 'I audit your Figma file for inconsistencies, missing states, and responsive gaps before writing a line of code — saving revisions later.' },
      { step: '02', title: 'Design Tokens', desc: 'Colours, typography, spacing, and shadows are extracted into CSS variables so the site is consistent and easy to update.' },
      { step: '03', title: 'Component Build', desc: 'I build bottom-up: atoms (buttons, inputs) → molecules (cards, navs) → pages. You review each component before we proceed.' },
      { step: '04', title: 'Animations', desc: 'Scroll reveals, hover effects, and page transitions are added last — so they enhance the experience without blocking the core build.' },
      { step: '05', title: 'QA & Handoff', desc: 'Side-by-side comparison of Figma vs browser on each breakpoint. Annotated differences resolved before final delivery.' },
    ],
    technologies: ['Figma', 'React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'HTML5', 'CSS3'],
    faqs: [
      { q: 'What format should my Figma file be in?', a: 'Ideally a shared Figma link with viewer access. The design should cover desktop (1440px) and mobile (375px) breakpoints at minimum, with all interactive states designed.' },
      { q: 'Can you work with partial designs?', a: 'Yes — I can fill gaps using your existing design system or brand guidelines. Gaps are flagged upfront so there are no surprises.' },
      { q: 'Do you handle backend/CMS integration too?', a: 'Absolutely. Most Figma-to-web projects pair naturally with WordPress or a headless CMS so clients can manage content themselves.' },
      { q: 'What if the design needs changes during development?', a: 'Small changes (copy, colours) are included at no charge. Structural layout changes mid-project are scoped separately to avoid timeline creep.' },
      { q: 'Can you match animations from a Figma prototype?', a: 'Yes. I translate Figma prototype interactions into real CSS/JS animations, and can suggest improvements where the prototype approach isn\'t practical in the browser.' },
    ],
  },
  {
    slug: 'ecommerce-development',
    name: 'E-Commerce Development',
    tagline: 'Online stores built to sell — fast checkout, seamless UX, and solid infrastructure.',
    metaDescription: 'E-commerce development by Umer Khan. WooCommerce stores, custom product pages, payment gateway integration, and conversion-focused design. Worldwide clients.',
    icon: 'SHOP',
    color: '#96588a',
    tags: ['WooCommerce', 'WordPress', 'Payment Gateways', 'Inventory', 'SEO'],
    hero: {
      heading: 'An Online Store That Actually Sells',
      sub: 'Conversion-focused WooCommerce stores — fast, secure, and set up to grow with your product catalogue.',
    },
    deliverables: [
      'Custom WooCommerce theme (no page builders)',
      'Product catalogue setup with categories and attributes',
      'Payment gateway integration (Stripe, PayPal, local gateways)',
      'Cart, checkout, and account pages fully branded',
      'Product search with filtering and sorting',
      'Abandoned cart recovery setup',
      'Order confirmation emails branded to your identity',
      'Google Analytics 4 + enhanced e-commerce tracking',
    ],
    process: [
      { step: '01', title: 'Store Strategy', desc: 'We map out your product catalogue, pricing logic, shipping rules, and checkout flow before any design work begins.' },
      { step: '02', title: 'Design & UX', desc: 'Figma designs for product listing, product detail, cart, and checkout pages — optimised for conversion, not just aesthetics.' },
      { step: '03', title: 'WooCommerce Build', desc: 'Custom theme built on WooCommerce. Product pages, variation pickers, quantity controls, and trust signals all bespoke.' },
      { step: '04', title: 'Payments & Shipping', desc: 'Payment gateways tested in sandbox mode, shipping zones configured, and tax rules set up for your markets.' },
      { step: '05', title: 'Launch & Track', desc: 'Go-live checklist: SSL, redirects, Google Shopping feed, Analytics events, and a test order end-to-end before we flip the switch.' },
    ],
    technologies: ['WordPress', 'WooCommerce', 'Stripe', 'PayPal', 'PHP', 'MySQL', 'Google Analytics 4', 'GTM'],
    faqs: [
      { q: 'Can you migrate my existing Shopify/WooCommerce store?', a: 'Yes — products, customers, and order history can all be migrated. Shopify migrations use the official CSV export format; WooCommerce-to-WooCommerce uses the native migrator.' },
      { q: 'What payment gateways do you support?', a: 'Stripe, PayPal, and Razorpay are the most common. I can integrate any gateway with a WooCommerce extension or REST API, including local Pakistani gateways.' },
      { q: 'Will it handle large product catalogues?', a: 'WooCommerce handles thousands of products well with proper caching (Redis or Varnish), a CDN, and database indexing — all of which I set up as standard.' },
      { q: 'Do you set up the checkout flow?', a: 'Yes — cart, checkout, and account pages are all fully customised and tested. I also configure guest checkout, address autocomplete, and one-page checkout for higher conversion.' },
      { q: 'Can you add a subscription or membership model?', a: 'Yes — WooCommerce Subscriptions for recurring billing and WooCommerce Memberships for gated content are both supported.' },
    ],
  },
  {
    slug: 'ui-ux-design',
    name: 'UI/UX Design',
    tagline: 'User interfaces that look sharp and feel intuitive — designed in Figma, ready to build.',
    metaDescription: 'UI/UX design services by Umer Khan. Figma design systems, wireframes, interactive prototypes for web apps and websites. Brand-consistent, conversion-focused.',
    icon: 'UX',
    color: '#ff7262',
    tags: ['Figma', 'Design Systems', 'Wireframes', 'Prototyping', 'UX Research'],
    hero: {
      heading: 'Design That Turns Visitors Into Customers',
      sub: 'Figma-first UI/UX work — from rough wireframe to pixel-perfect prototype ready for handoff.',
    },
    deliverables: [
      'User flow diagrams and sitemap',
      'Low-fidelity wireframes for all key screens',
      'High-fidelity Figma designs (desktop + mobile)',
      'Component library with variants and states',
      'Interactive prototype with real navigation',
      'Design tokens: colours, typography, spacing, shadows',
      'Responsive layouts for 3 breakpoints minimum',
      'Annotated handoff file for developers',
    ],
    process: [
      { step: '01', title: 'UX Research', desc: 'Competitor analysis, user goals, and pain points mapped out. A product built on assumptions ships twice.' },
      { step: '02', title: 'Information Architecture', desc: 'Sitemap and user flows defined so we know every screen that needs designing before opening Figma.' },
      { step: '03', title: 'Wireframes', desc: 'Greyscale layouts for every key screen — reviewed and approved before adding colour or detail.' },
      { step: '04', title: 'Visual Design', desc: 'High-fidelity Figma screens with your brand colours, typography, and photography. Includes all interactive states.' },
      { step: '05', title: 'Prototype & Handoff', desc: 'Interactive Figma prototype for stakeholder sign-off, then a developer-ready handoff file with spacing, assets, and tokens.' },
    ],
    technologies: ['Figma', 'FigJam', 'Stark (Accessibility)', 'Unsplash', 'Google Fonts', 'Iconify'],
    faqs: [
      { q: 'Do you also develop the designs you create?', a: 'Yes — this is actually my biggest differentiator. I design with development constraints in mind and can build the final product myself, so there\'s no translation loss between design and code.' },
      { q: 'What if I only have a logo and colour palette?', a: 'That\'s a perfect starting point. I\'ll extend your brand identity into a full design system and apply it consistently across all screens.' },
      { q: 'Can you redesign an existing product?', a: 'Yes. I\'ll do a UX audit of the current design first, identify friction points, and propose targeted improvements rather than a full rebuild if that\'s more appropriate.' },
      { q: 'How many revisions are included?', a: 'Two rounds of revisions per screen are included in the base price. Additional rounds are available at an hourly rate. Most projects wrap in one or two rounds.' },
      { q: 'Do you conduct user testing?', a: 'Basic usability testing (5 users, moderated remote sessions) is available as an add-on. Results feed back into the design before handoff.' },
    ],
  },
  {
    slug: 'seo-performance',
    name: 'SEO & Performance',
    tagline: 'Core Web Vitals, schema markup, and technical SEO that moves the needle in search rankings.',
    metaDescription: 'SEO and performance optimisation by Umer Khan. Core Web Vitals, Lighthouse 90+, schema markup, technical SEO audits, image optimisation. Real results for real businesses.',
    icon: 'SEO',
    color: '#22d3ee',
    tags: ['Technical SEO', 'Core Web Vitals', 'Schema', 'PageSpeed', 'Lighthouse'],
    hero: {
      heading: 'Rank Higher. Load Faster.',
      sub: 'Technical SEO and Core Web Vitals work that translates into real search rankings — not just green Lighthouse bars.',
    },
    deliverables: [
      'Full technical SEO audit (crawl errors, redirects, indexing)',
      'Core Web Vitals optimisation (LCP, INP, CLS)',
      'Structured data / schema markup (Person, Article, FAQ, Product)',
      'Image optimisation: WebP conversion, lazy loading, sizing',
      'Page speed: minification, caching, CDN, critical CSS',
      'XML sitemap and robots.txt review',
      'On-page SEO: title tags, meta descriptions, heading hierarchy',
      'Google Search Console setup and monitoring',
    ],
    process: [
      { step: '01', title: 'Audit', desc: 'Full crawl of your site with Screaming Frog and Lighthouse. Every issue is catalogued, prioritised by impact, and presented in a clear action list.' },
      { step: '02', title: 'Quick Wins', desc: 'Image compression, caching headers, and meta tag fixes are implemented first — these typically move the needle within days.' },
      { step: '03', title: 'Core Web Vitals', desc: 'LCP, INP, and CLS improvements: server response time, render-blocking resources, layout shift culprits. Each fix is measured before and after.' },
      { step: '04', title: 'Schema & Structure', desc: 'Structured data added for your key content types. Sitemap and robots.txt reviewed. Internal linking reviewed for crawl efficiency.' },
      { step: '05', title: 'Reporting', desc: 'A before/after Lighthouse report and a Search Console benchmark so you can see exactly what changed and track the impact over the coming months.' },
    ],
    technologies: ['Google Search Console', 'Screaming Frog', 'Lighthouse', 'WebPageTest', 'Cloudflare', 'Schema.org', 'GTM'],
    faqs: [
      { q: 'How long before I see results in search rankings?', a: 'Technical fixes (speed, indexing, schema) are picked up by Google within 2–4 weeks. Ranking improvements typically become visible over 2–3 months as Google re-crawls and re-evaluates your pages.' },
      { q: 'Do you do content SEO (keyword research, writing)?', a: 'My focus is technical SEO and performance. I can recommend content opportunities and keyword gaps, but the actual writing is not part of the core service.' },
      { q: 'What Lighthouse score should I aim for?', a: 'A Performance score of 90+ on mobile is the practical target. Scores above 90 are where diminishing returns set in; the effort is better spent on content and links.' },
      { q: 'Do I need to be on WordPress for this?', a: 'No. I work with any platform — WordPress, Next.js, Webflow, custom builds. The optimisation techniques differ but the principles are the same.' },
      { q: 'Can you help if my site was penalised by Google?', a: 'Yes. Manual penalty recovery (submitting a reconsideration request) and algorithmic penalty analysis are available as a separate engagement. Send me your Search Console data and I\'ll assess.' },
    ],
  },
  {
    slug: 'website-maintenance',
    name: 'Website Maintenance',
    tagline: 'Monthly care plans that keep your site secure, fast, and up to date — without you lifting a finger.',
    metaDescription: 'WordPress website maintenance by Umer Khan. Monthly updates, security monitoring, backups, uptime monitoring, and 1 hour of content changes. Flat monthly rate.',
    icon: 'MAINT',
    color: '#a3e635',
    tags: ['WordPress Updates', 'Security', 'Backups', 'Uptime Monitoring', 'Support'],
    hero: {
      heading: 'Your Site, Always Healthy',
      sub: 'Flat-rate monthly maintenance so your website never becomes the thing you\'re worrying about.',
    },
    deliverables: [
      'WordPress core, theme, and plugin updates (monthly)',
      'Automated daily backups with 30-day retention',
      'Uptime monitoring with instant email alerts',
      'Malware scanning and security hardening',
      'Broken link checking and redirect maintenance',
      '1 hour of content edits per month included',
      'Monthly health report (uptime, speed, security status)',
      'Priority response for urgent issues',
    ],
    process: [
      { step: '01', title: 'Onboarding', desc: 'Access to your WordPress admin, hosting, and DNS. I set up automated backups and monitoring tools before touching anything else.' },
      { step: '02', title: 'Initial Audit', desc: 'Snapshot of current plugin versions, security status, and performance baseline. Any immediate risks are fixed in the first session.' },
      { step: '03', title: 'Monthly Updates', desc: 'Core, themes, and plugins updated in a staging environment first — tested, then pushed to production. Zero downtime for your visitors.' },
      { step: '04', title: 'Security Check', desc: 'Monthly malware scan, login attempt review, and file integrity check. Any issues flagged and resolved before they become problems.' },
      { step: '05', title: 'Report', desc: 'Monthly email with uptime %, speed score, what was updated, any issues found, and a summary of content changes made.' },
    ],
    technologies: ['WordPress', 'ManageWP', 'Cloudflare', 'Wordfence', 'UpdraftPlus', 'UptimeRobot', 'Git'],
    faqs: [
      { q: 'What platforms do you maintain?', a: 'Primarily WordPress sites. For non-WordPress sites (Next.js, static sites), I offer a lighter plan covering server monitoring, dependency updates, and deployment support.' },
      { q: 'What if something breaks?', a: 'Covered. If an update causes an issue, I roll back immediately using the pre-update backup and fix the root cause. This is included at no extra charge.' },
      { q: 'Can I increase the content editing hours?', a: 'Yes — additional hours are available at an hourly rate, billed at the end of each month. Most clients find 1 hour is sufficient for minor copy and image updates.' },
      { q: 'Is there a contract?', a: 'Month-to-month with 30 days\' notice to cancel. No long-term commitment required.' },
      { q: 'Do you offer emergency support outside the maintenance plan?', a: 'Yes. If your site goes down or is hacked outside the maintenance schedule, I offer emergency response with a 2-hour SLA. Fee: $80/hour, minimum 1 hour.' },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
