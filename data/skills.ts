export type SkillFAQ = { q: string; a: string };

export type Skill = {
  slug: string;
  name: string;
  icon: string; // react-icons/si export name
  color: string;
  category: string;
  yearsLabel: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  experience: string;
  capabilities: string[];
  projectSlugs: string[];
  relatedServiceSlug: string;
  relatedSkillSlugs: string[];
  faqs: SkillFAQ[];
};

export const skills: Skill[] = [
  {
    slug: 'wordpress',
    name: 'WordPress',
    icon: 'SiWordpress',
    color: '#21759B',
    category: 'CMS & Content',
    yearsLabel: '4+ years',
    tagline: 'Custom themes, Elementor builds, and WooCommerce stores that clients can actually manage.',
    seoTitle: 'WordPress Developer Experience — Custom Themes & Elementor',
    seoDescription:
      "4+ years building custom WordPress themes, Elementor sites, and WooCommerce stores. See real client projects, the WP stack I use, and how I approach every build.",
    intro:
      "WordPress is where most of my client work lives, and for good reason — it's the right tool for the vast majority of business websites. Over 4+ years I've shipped 50+ WordPress sites ranging from single-page brand sites to full WooCommerce stores with custom checkout logic.",
    experience:
      "My WordPress work splits into two tracks: fully custom theme development (PHP, custom post types, ACF fields, hand-coded templates) for projects that need precise control, and Elementor Pro builds for clients who need to self-edit content after launch. I've built recruitment platforms with automated CV parsing (GlobalRemote.nl), booking-driven service sites for laundry and wellness businesses, multi-location restaurant sites with custom menu systems, and WooCommerce stores selling everything from furniture to plant subscriptions. The common thread is always the same: a theme structure clean enough that the client's own team can update content without breaking the layout.",
    capabilities: [
      'Custom theme development from Figma — pixel-accurate, no theme-shop compromises',
      'Elementor Pro builds with reusable global widgets and consistent design systems',
      'Advanced Custom Fields (ACF) for structured content editors can actually use',
      'WooCommerce store setup — products, variations, payment gateways, shipping rules',
      'Custom post types and taxonomies for non-standard content (portfolios, bookings, listings)',
      'Performance and security hardening — caching, plugin audits, hosting configuration',
    ],
    projectSlugs: ['globalremote', 'talehouse', 'novara-md', 'cleverconcept', 'wetotalcare', 'gc-logistics', 'house-of-greens', 'karma-fastfood', 'lobos-co', 'manyway-laundry', 'panaceacare', 'shopfitters-fitout', 'furniture-store', 'yogi-escape', 'veterans-transition-support'],
    relatedServiceSlug: 'wordpress-development',
    relatedSkillSlugs: ['php', 'woocommerce', 'figma'],
    faqs: [
      { q: 'How many WordPress sites have you built?', a: "50+ WordPress projects since 2020 — a mix of fully custom themes, Elementor Pro builds, and WooCommerce stores, mostly for small-to-medium businesses across Europe, North America, and Australia." },
      { q: 'Do you build custom themes or use page builders?', a: "Both, depending on the client. If the design is complex and won't change much post-launch, I hand-code a custom theme for maximum performance and control. If the client wants to add pages and edit layouts themselves long-term, I build it in Elementor Pro with a structured global design system so it stays consistent." },
      { q: 'Can you fix or take over an existing WordPress site?', a: "Yes — a good chunk of my work is auditing and rebuilding sites that were poorly built by previous developers or low-cost templates. I start with a technical audit before quoting any changes." },
    ],
  },
  {
    slug: 'react',
    name: 'React',
    icon: 'SiReact',
    color: '#61DAFB',
    category: 'Frontend',
    yearsLabel: '3+ years',
    tagline: 'Component-driven frontends for full-stack apps that need to feel fast and bespoke.',
    seoTitle: 'React Developer Experience — Custom Web Apps',
    seoDescription:
      '3+ years building React frontends for custom web applications — Hooks, Context API, and component architecture built to scale. See the real project behind it.',
    intro:
      "React is my go-to whenever a project outgrows what WordPress can comfortably do — real-time interactions, complex state, or a UI that needs to feel like a native app rather than a page that reloads.",
    experience:
      "The clearest example of this in my portfolio is RoadDarts.com, a business-discovery platform I built end-to-end with React on the frontend. The brief needed live map filtering, proximity search, and instant UI updates as users adjusted filters — exactly the kind of interaction model that fights against a traditional CMS. I structured the app around reusable components and custom hooks for the map logic, search state, and API data fetching, which kept the codebase maintainable as the feature list grew. Sub-2-second load times were a hard requirement, so component-level code splitting and careful re-render management mattered as much as the feature work itself.",
    capabilities: [
      'Functional components with Hooks — useState, useEffect, useMemo, custom hooks',
      'Context API and prop-driven state management for small-to-medium apps',
      'Component architecture that stays maintainable as feature count grows',
      'Integrating third-party APIs (Google Maps, payment gateways, REST services)',
      'Performance optimization — code splitting, memoization, render profiling',
      'Pairing React with Node.js/Express backends for full-stack MERN apps',
    ],
    projectSlugs: ['roaddarts', 'kings-capital', 'kingspeg'],
    relatedServiceSlug: 'mern-stack-development',
    relatedSkillSlugs: ['nodejs', 'mongodb', 'nextjs'],
    faqs: [
      { q: 'When does it make sense to use React instead of WordPress?', a: "When the product needs real interactivity that a CMS can't deliver cleanly — live filtering, dashboards, booking systems with dynamic logic, or anything where the UI state changes faster than a page reload can keep up." },
      { q: 'Do you build the backend too, or just the React frontend?', a: "Both — I work the full MERN stack (MongoDB, Express, React, Node.js), so I can take a project from database schema through to the deployed UI without handing off between specialists." },
    ],
  },
  {
    slug: 'nodejs',
    name: 'Node.js',
    icon: 'SiNodedotjs',
    color: '#3C873A',
    category: 'Backend',
    yearsLabel: '3+ years',
    tagline: 'REST APIs and server-side logic for custom web applications.',
    seoTitle: 'Node.js Backend Developer Experience',
    seoDescription:
      '3+ years building Node.js REST APIs, Express middleware, and JWT authentication for full-stack MERN applications.',
    intro:
      "Node.js is the backend half of every custom web app I build — the layer that handles authentication, business logic, and talking to the database, away from anything the user sees directly.",
    experience:
      "On RoadDarts.com, the Node.js/Express backend served a REST API consumed by the React frontend, with MongoDB geospatial queries doing the heavy lifting for proximity-based business search. The API needed to handle filtering across multiple dimensions (category, distance, rating) without the frontend feeling sluggish, which meant getting the query structure and indexing right at the database layer rather than trying to compensate with frontend caching tricks. I also build smaller Node services for specific automation needs — webhook receivers, data transformation scripts, and custom integrations that sit between a client's WordPress site and a third-party tool.",
    capabilities: [
      'RESTful API design with Express.js — routing, middleware, error handling',
      'JWT-based authentication and session management',
      'MongoDB integration — schema design, aggregation pipelines, geospatial queries',
      'Third-party API integrations (Google Maps, payment processors, CRMs)',
      'Webhook receivers and lightweight automation services',
      'Server-side architecture decisions — when to cache, when to query fresh',
    ],
    projectSlugs: ['roaddarts'],
    relatedServiceSlug: 'mern-stack-development',
    relatedSkillSlugs: ['react', 'mongodb', 'n8n'],
    faqs: [
      { q: 'What kind of projects use your Node.js skills?', a: "Custom web applications that need their own backend logic rather than relying on a CMS — RoadDarts.com is the clearest example, where Node/Express handles the API layer behind a React frontend." },
    ],
  },
  {
    slug: 'mongodb',
    name: 'MongoDB',
    icon: 'SiMongodb',
    color: '#47A248',
    category: 'Database',
    yearsLabel: '3+ years',
    tagline: 'NoSQL schema design and geospatial queries for the MERN stack.',
    seoTitle: 'MongoDB Database Design Experience',
    seoDescription:
      '3+ years designing MongoDB schemas, aggregation pipelines, and geospatial indexes for MERN stack applications.',
    intro:
      'MongoDB is my default database choice for custom MERN applications — its document model fits naturally with how I structure data coming from a React frontend, and its geospatial features have been essential for location-based features.',
    experience:
      "RoadDarts.com is the project that put MongoDB's geospatial indexing to real use — the platform needed to find and rank business listings by proximity to the user, across thousands of records, fast enough that filtering felt instant. That meant designing the schema around 2dsphere indexes from the start rather than trying to retrofit location search later, plus building aggregation pipelines that could combine proximity, category filters, and sorting in a single query rather than multiple round trips.",
    capabilities: [
      'Schema design for document-based data models',
      'Geospatial indexing and proximity queries (2dsphere)',
      'Aggregation pipelines for multi-stage filtering and sorting',
      'Indexing strategy for query performance at scale',
      'Integration with Node.js/Express via Mongoose or native driver',
    ],
    projectSlugs: ['roaddarts'],
    relatedServiceSlug: 'mern-stack-development',
    relatedSkillSlugs: ['nodejs', 'react'],
    faqs: [
      { q: 'Why MongoDB instead of a SQL database for these projects?', a: "For MERN stack apps with flexible, nested data structures (like business listings with variable fields) and location-based queries, MongoDB's document model and geospatial indexing are a more natural fit than relational tables and joins." },
    ],
  },
  {
    slug: 'figma',
    name: 'Figma',
    icon: 'SiFigma',
    color: '#F24E1E',
    category: 'Design',
    yearsLabel: 'Daily use',
    tagline: 'Pixel-perfect design-to-code conversion and original UI design.',
    seoTitle: 'Figma to Code & UI Design Experience',
    seoDescription:
      'Daily Figma use for pixel-perfect design-to-code conversion, original UI/UX design, and client collaboration on web projects.',
    intro:
      "Figma sits at the start of almost every project I take on — either reading someone else's design to convert into code with zero compromises, or designing the interface myself before I build it.",
    experience:
      "On projects like Novara MD, WeTotalCare, and a custom furniture e-commerce build, I worked from client-supplied Figma files and converted them to WordPress/Elementor with exact spacing, typography, and interaction states preserved — the kind of pixel-matching that separates a 'looks close enough' build from one that's actually faithful to the design. For projects without an existing design, I design directly in Figma first: wireframes, then high-fidelity mockups with auto-layout and components set up cleanly enough to hand off to development (myself or someone else) without ambiguity.",
    capabilities: [
      'Pixel-accurate Figma-to-code conversion (HTML/CSS, WordPress, React)',
      'Auto-layout and component-based design systems for clean dev handoff',
      'Wireframing through high-fidelity UI design',
      'Responsive design specs across breakpoints',
      'Client collaboration — design review cycles, feedback loops, version control',
    ],
    projectSlugs: ['novara-md', 'wetotalcare', 'furniture-store'],
    relatedServiceSlug: 'figma-to-web',
    relatedSkillSlugs: ['wordpress', 'html5', 'tailwindcss'],
    faqs: [
      { q: 'Can you build from a design I already have in Figma?', a: "Yes — sending me the Figma file (with edit/dev access) is the fastest way to start a project. I'll convert it pixel-for-pixel into WordPress, Elementor, or custom code depending on what the project needs." },
      { q: 'Do you also do the design work, not just development?', a: "Yes — for projects without an existing design, I design the UI in Figma first, get sign-off, then build. This avoids the back-and-forth of designing inside the CMS itself." },
    ],
  },
  {
    slug: 'n8n',
    name: 'n8n',
    icon: 'SiN8N',
    color: '#EA4B71',
    category: 'Automation',
    yearsLabel: '2+ years',
    tagline: 'Workflow automation that replaces hours of manual work every week.',
    seoTitle: 'n8n Automation Developer Experience',
    seoDescription:
      '2+ years building n8n workflow automations — CRM integrations, CV parsing pipelines, and business process automation for real clients.',
    intro:
      "n8n is the tool I reach for whenever a client describes a repetitive manual process — moving data between systems, processing form submissions, or triggering follow-up actions that someone on their team currently does by hand.",
    experience:
      "The standout project here is GlobalRemote.nl, a Dutch recruitment platform where I built the automated workflows behind their candidate intake. Before this, their team was spending 8+ hours a day manually processing CVs and entering candidate data. I built n8n workflows that trigger on form submission, parse uploaded CVs to extract structured candidate data, route applicants to the correct job category, push everything into their CRM, and send automated follow-up emails — all without anyone touching it. The pipeline went live within three weeks and eliminated that entire manual workload.",
    capabilities: [
      'Workflow design — triggers, conditional logic, error handling',
      'CV/document parsing pipelines with structured data extraction',
      'CRM and third-party API integrations via REST/webhooks',
      'Self-hosted n8n setup and server configuration',
      'Process mapping — translating a manual workflow into automated logic',
    ],
    projectSlugs: ['globalremote'],
    relatedServiceSlug: 'n8n-automation',
    relatedSkillSlugs: ['nodejs', 'wordpress'],
    faqs: [
      { q: 'What kind of manual processes have you automated?', a: "CV/resume parsing and candidate routing for a recruitment platform (GlobalRemote.nl), plus smaller automations for lead handling, CRM syncing, and notification workflows across other client projects." },
      { q: 'Is n8n better than Zapier for this kind of work?', a: "For high-volume or complex workflows, yes — n8n is self-hosted with no per-task pricing, so it scales without the cost spiral Zapier has at volume. I cover this in more detail on the blog." },
    ],
  },
  {
    slug: 'javascript',
    name: 'JavaScript',
    icon: 'SiJavascript',
    color: '#F7DF1E',
    category: 'Language',
    yearsLabel: '6+ years',
    tagline: 'The language behind every interactive feature I build, on any stack.',
    seoTitle: 'JavaScript Developer Experience — 6+ Years',
    seoDescription:
      "6+ years of JavaScript — ES6+, async patterns, DOM manipulation, and the language underneath every custom WordPress theme, React app, and automation I build.",
    intro:
      "JavaScript is the constant across every project regardless of stack — it's what makes a custom WordPress theme interactive, what powers a React app's logic, and what glues together the smaller scripts in between.",
    experience:
      "On custom WordPress builds like Talehouse, GC Logistics, and Karma Fast Food, JavaScript handles everything React/Vue would on a more app-like project: custom interactions, form validation, dynamic content loading, and integrating things like Google Maps without relying on a heavy plugin. On the React/Node side (RoadDarts.com), it's the full application logic from API calls to UI state. Six years in, the patterns that matter most are the unglamorous ones — clean async/await flows instead of callback chains, defensive error handling, and not shipping more JavaScript than a page actually needs.",
    capabilities: [
      'Modern ES6+ — async/await, destructuring, modules, arrow functions',
      'DOM manipulation and event handling without unnecessary dependencies',
      'Custom interactive components for WordPress/Elementor sites',
      'API integration — fetch, REST consumption, error handling',
      'Performance-conscious scripting — avoiding render-blocking, lazy loading',
    ],
    projectSlugs: ['talehouse', 'cleverconcept', 'gc-logistics', 'karma-fastfood', 'shopfitters-fitout', 'furniture-store', 'roaddarts', 'drivco-auction', 'kings-capital', 'kingspeg', 'veterans-transition-support'],
    relatedServiceSlug: 'wordpress-development',
    relatedSkillSlugs: ['react', 'typescript', 'html5'],
    faqs: [
      { q: 'Do you write vanilla JavaScript or always reach for a framework?', a: "Depends on the project. Custom WordPress sites usually get vanilla JS or light libraries for interactions — no point shipping a framework's overhead for a few interactive components. Full applications get React." },
    ],
  },
  {
    slug: 'typescript',
    name: 'TypeScript',
    icon: 'SiTypescript',
    color: '#3178C6',
    category: 'Language',
    yearsLabel: '2+ years',
    tagline: 'Type-safe React and Next.js development for fewer runtime surprises.',
    seoTitle: 'TypeScript Developer Experience',
    seoDescription:
      '2+ years writing type-safe TypeScript across React and Next.js projects — interfaces, generics, and strict mode to catch bugs before they ship.',
    intro:
      "TypeScript is what I reach for on any project with enough moving parts that type safety pays for itself — which, in practice, is most React and Next.js work at this point.",
    experience:
      "This very portfolio site is a working example — built in Next.js 14 with TypeScript throughout, from typed data models (services, blog posts, projects) to typed component props across 40+ components. Strict mode catches the kind of mismatch bugs (wrong prop shape, undefined data fields) that would otherwise surface as a runtime error in front of a client. On client projects with API integrations, typed interfaces for request/response shapes make it much harder to ship a silent data-mapping bug.",
    capabilities: [
      'Strict mode TypeScript — no implicit any, full type coverage',
      'Interfaces and type definitions for data models and API contracts',
      'Generics for reusable, type-safe component patterns',
      'Type-safe React props and hooks',
      'Migrating existing JavaScript codebases to TypeScript incrementally',
    ],
    projectSlugs: [],
    relatedServiceSlug: 'mern-stack-development',
    relatedSkillSlugs: ['react', 'nextjs', 'javascript'],
    faqs: [
      { q: 'Is this portfolio site itself built with TypeScript?', a: "Yes — Next.js 14 App Router with TypeScript throughout, which is honestly the best way to evaluate this skill directly: browse the site and you're looking at the output." },
    ],
  },
  {
    slug: 'nextjs',
    name: 'Next.js',
    icon: 'SiNextdotjs',
    color: '#FFFFFF',
    category: 'Framework',
    yearsLabel: '2+ years',
    tagline: 'App Router, SSR, and production deployments — this site is the case study.',
    seoTitle: 'Next.js Developer Experience — App Router & SSR',
    seoDescription:
      '2+ years building production Next.js applications — App Router, server-side rendering, static generation, and full deployment pipelines.',
    intro:
      "Next.js is my framework of choice for any project that needs to be fast, SEO-friendly, and genuinely production-grade rather than a single-page app bolted onto a CMS.",
    experience:
      "This portfolio is built end-to-end in Next.js 14 with the App Router — static generation for marketing pages, dynamic routes for case studies and blog posts, a server-rendered API route handling contact form submissions into a Postgres database, dynamically generated Open Graph images, and a sitemap that regenerates itself from the underlying data instead of going stale. It's deployed via a CI/CD pipeline (GitHub Actions → VPS, PM2 process management) rather than a one-click host, which means handling real production concerns: environment variables, build steps, and zero-downtime restarts.",
    capabilities: [
      'App Router architecture — layouts, nested routes, server/client components',
      'Static generation (SSG) and server-side rendering (SSR) where each is appropriate',
      'API routes for backend logic (form handling, database writes, third-party integrations)',
      'Dynamic metadata, sitemaps, and Open Graph image generation',
      'Production deployment — CI/CD pipelines, environment configuration, process management',
    ],
    projectSlugs: [],
    relatedServiceSlug: 'mern-stack-development',
    relatedSkillSlugs: ['react', 'typescript', 'nodejs'],
    faqs: [
      { q: 'What parts of this site demonstrate real Next.js production experience?', a: "The contact form (API route → Postgres → branded email sends), the dynamically generated sitemap and OG images, and the CI/CD deploy pipeline to a self-managed VPS — all things a marketing-only site wouldn't need, which is exactly why they're useful proof points." },
    ],
  },
  {
    slug: 'php',
    name: 'PHP',
    icon: 'SiPhp',
    color: '#8993BE',
    category: 'Backend',
    yearsLabel: '4+ years',
    tagline: 'Custom WordPress development — hooks, filters, and OOP PHP.',
    seoTitle: 'PHP Developer Experience — WordPress Custom Development',
    seoDescription:
      '4+ years writing PHP for custom WordPress development — hooks, filters, custom post types, OOP plugin architecture, and WP-CLI workflows.',
    intro:
      "PHP is the backend language behind nearly every WordPress project I build — it's what turns a generic CMS into a site with exactly the custom functionality a client's business actually needs.",
    experience:
      "Across projects like GlobalRemote.nl, GC Logistics, and Lobos & Co, PHP work has ranged from custom theme template logic to building small custom plugins for specific business rules — booking systems with availability logic, custom post types for non-standard content (equipment listings, service packages), and hooking into WooCommerce's action/filter system to customize checkout behavior without touching core files. The discipline that matters most in WordPress PHP work is restraint: hook into the system the right way (actions, filters, template hierarchy) rather than fighting it with hacky overrides that break on the next update.",
    capabilities: [
      'Custom WordPress theme development — template hierarchy, hooks, filters',
      'Object-oriented PHP for custom plugin logic',
      'WooCommerce customization via the action/filter system',
      'WP-CLI for deployment and maintenance workflows',
      'Cron jobs and scheduled task automation within WordPress',
    ],
    projectSlugs: ['globalremote', 'talehouse', 'gc-logistics', 'karma-fastfood', 'lobos-co', 'manyway-laundry', 'panaceacare', 'shopfitters-fitout', 'house-of-greens', 'drivco-auction', 'veterans-transition-support'],
    relatedServiceSlug: 'wordpress-development',
    relatedSkillSlugs: ['wordpress', 'mysql', 'woocommerce'],
    faqs: [
      { q: 'Do you write custom plugins or only theme-level PHP?', a: "Both — most projects only need theme-level customization, but when a client needs functionality that should survive a theme change (custom post types, booking logic), I build it as a lightweight custom plugin instead." },
    ],
  },
  {
    slug: 'tailwindcss',
    name: 'Tailwind CSS',
    icon: 'SiTailwindcss',
    color: '#06B6D4',
    category: 'Frontend',
    yearsLabel: '3+ years',
    tagline: 'Rapid, consistent UI development with a real design system underneath.',
    seoTitle: 'Tailwind CSS Developer Experience',
    seoDescription:
      '3+ years using Tailwind CSS for rapid UI development with custom design tokens and consistent, responsive component systems.',
    intro:
      "Tailwind is my default for any custom-coded frontend — React, Next.js, or hand-built HTML/CSS — because it keeps spacing, color, and typography consistent across a whole codebase without fighting separate stylesheet files.",
    experience:
      "This portfolio site runs entirely on a custom Tailwind config — every color (the ink/cream/lime palette), font, and spacing scale is defined as a design token once and reused across 40+ components, which is what keeps a site this visually dense from turning into inconsistent one-off CSS. The same approach carries into client React/Next.js projects: define the design system as Tailwind config first, then build components against it, instead of writing bespoke CSS per component and losing consistency as the project grows.",
    capabilities: [
      'Custom Tailwind config — design tokens for color, spacing, typography',
      'Responsive, mobile-first component design',
      'Component-level consistency at scale across large codebases',
      'Combining Tailwind with custom CSS where utility classes aren\'t enough',
      'Dark-mode and theme-variant patterns',
    ],
    projectSlugs: ['kings-capital', 'drivco-auction'],
    relatedServiceSlug: 'ui-ux-design',
    relatedSkillSlugs: ['react', 'html5', 'figma'],
    faqs: [
      { q: 'Is this whole site built with Tailwind?', a: "Yes — every component uses a shared Tailwind config with custom design tokens (the ink/cream/lime color system), which is the fastest way to verify this skill: the consistency you see across pages is the config working as intended." },
    ],
  },
  {
    slug: 'woocommerce',
    name: 'WooCommerce',
    icon: 'SiWoocommerce',
    color: '#96588A',
    category: 'E-Commerce',
    yearsLabel: '3+ years',
    tagline: 'Full e-commerce builds — products, payments, and checkout flows that convert.',
    seoTitle: 'WooCommerce Developer Experience — Custom E-Commerce',
    seoDescription:
      '3+ years building WooCommerce stores — custom product types, payment gateway integration, and checkout customization for real client stores.',
    intro:
      "WooCommerce is my platform of choice for e-commerce projects under roughly 10,000 SKUs — mature, well-supported, and flexible enough to handle custom product logic without fighting the platform.",
    experience:
      "WeTotalCare, House of Greens, and a custom furniture store are the clearest examples — each needed more than the default WooCommerce setup. WeTotalCare required premium plugin integration for subscription-style products, House of Greens needed custom product variations for plant sizing/care options, and the furniture store needed a checkout flow customized for large-item shipping logic that doesn't fit WooCommerce's default assumptions. In each case, the work was less about installing WooCommerce and more about adapting its checkout, product, and shipping logic to match how the specific business actually operates.",
    capabilities: [
      'Custom product types and variation logic beyond WooCommerce defaults',
      'Payment gateway integration (Stripe, PayPal, regional processors)',
      'Checkout flow customization for non-standard shipping/fulfillment needs',
      'Premium plugin integration (subscriptions, bookings, memberships)',
      'Inventory and order management workflow setup',
    ],
    projectSlugs: ['wetotalcare', 'house-of-greens', 'furniture-store'],
    relatedServiceSlug: 'ecommerce-development',
    relatedSkillSlugs: ['wordpress', 'php'],
    faqs: [
      { q: 'Can WooCommerce handle a large product catalogue?', a: "Yes, comfortably up to a few thousand SKUs with proper performance configuration (caching, optimized queries). Past that scale, I'd discuss whether a dedicated e-commerce platform makes more sense — I'll always give you the honest answer, not the one that sells more of my own time." },
    ],
  },
  {
    slug: 'git',
    name: 'Git',
    icon: 'SiGit',
    color: '#F05032',
    category: 'Tooling',
    yearsLabel: '6+ years',
    tagline: 'Version control and CI/CD workflows for every project, solo or team.',
    seoTitle: 'Git & CI/CD Workflow Experience',
    seoDescription:
      '6+ years using Git for version control, branching strategies, and GitHub Actions CI/CD pipelines across client and personal projects.',
    intro:
      "Git underlies the workflow for every project I ship, including this portfolio — proper version control isn't optional even on solo projects, because it's what makes safe experimentation and clean rollbacks possible.",
    experience:
      "This site's deployment pipeline is a direct demonstration: a GitHub Actions workflow builds and tests on every push to main, then deploys over SSH to a self-managed VPS running PM2 — no manual file uploads, no FTP. On client projects, Git discipline shows up as clean commit history, feature branches for anything riskier than a typo fix, and never force-pushing over a deploy that's already live.",
    capabilities: [
      'Branching strategies — feature branches, trunk-based workflows depending on project size',
      'GitHub Actions CI/CD pipelines for automated build + deploy',
      'Code review practices on collaborative projects',
      'Safe rollback and hotfix workflows for production issues',
      'Managing deploy keys and SSH-based server access securely',
    ],
    projectSlugs: [],
    relatedServiceSlug: 'website-maintenance',
    relatedSkillSlugs: ['nextjs', 'nodejs'],
    faqs: [
      { q: 'How do you deploy projects to production?', a: "For this site and similar projects: push to GitHub, a GitHub Actions workflow runs the build, then deploys over SSH to the VPS and restarts the process via PM2. Fully automated, no manual steps." },
    ],
  },
  {
    slug: 'html5',
    name: 'HTML5',
    icon: 'SiHtml5',
    color: '#E34F26',
    category: 'Frontend',
    yearsLabel: '6+ years',
    tagline: 'Semantic, accessible markup underneath every site I build.',
    seoTitle: 'HTML5 & Web Standards Experience',
    seoDescription:
      '6+ years writing semantic HTML5 — accessibility, web standards, and cross-browser compatibility as the foundation of every project.',
    intro:
      "HTML5 is the part of the stack that gets the least attention but matters the most for SEO and accessibility — semantic markup is what lets search engines and screen readers actually understand a page's structure.",
    experience:
      "Across every WordPress theme, React component, and landing page I've built, the markup itself is written to be semantically correct — proper heading hierarchy, ARIA attributes where native semantics fall short, and structure that survives a screen reader pass, not just a visual design review. This matters concretely for SEO: the structured content on this site's blog and service pages, for instance, follows a clean H1→H2→H3 hierarchy specifically because Google's crawlers and AI overview systems both parse semantic structure to understand what a page is actually about.",
    capabilities: [
      'Semantic markup — correct heading hierarchy, landmark elements, structure',
      'ARIA attributes and accessibility best practices',
      'Cross-browser compatibility testing and fixes',
      'SEO-aware markup structure (which doubles as AI-crawler-friendly structure)',
      'Forms, validation, and accessible interactive elements',
    ],
    projectSlugs: ['drivco-auction', 'kings-capital', 'kingspeg', 'veterans-transition-support'],
    relatedServiceSlug: 'seo-performance',
    relatedSkillSlugs: ['javascript', 'tailwindcss'],
    faqs: [],
  },
  {
    slug: 'mysql',
    name: 'MySQL',
    icon: 'SiMysql',
    color: '#4479A1',
    category: 'Database',
    yearsLabel: '3+ years',
    tagline: 'Relational database design for WordPress and custom backend systems.',
    seoTitle: 'MySQL Database Experience',
    seoDescription:
      '3+ years working with MySQL — relational database design, query optimization, and the data layer behind every WordPress and WooCommerce project.',
    intro:
      "MySQL is the database underneath every WordPress and WooCommerce project I build — usually invisible to the client, but directly responsible for how fast or slow their site feels under load.",
    experience:
      "Most of the MySQL-level work on client projects is performance-focused: identifying slow queries on sites with large product catalogues or post counts, adding the right indexes, and occasionally writing custom queries for reporting or data migration tasks that the WordPress admin UI can't handle directly. On bigger WooCommerce stores, this is often the difference between a site that feels instant and one that visibly lags during checkout.",
    capabilities: [
      'Relational schema understanding for WordPress/WooCommerce data structures',
      'Query optimization and indexing for performance',
      'Direct database access for migrations, cleanup, and reporting tasks',
      'Diagnosing performance bottlenecks at the database layer',
    ],
    projectSlugs: ['drivco-auction'],
    relatedServiceSlug: 'seo-performance',
    relatedSkillSlugs: ['php', 'wordpress'],
    faqs: [],
  },
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

/* Maps free-text technology tag strings (as used in projects.json,
   ServicesSection tags, WorkClient tech tags, etc.) to a skill slug,
   so any tag rendered across the site can link to its skill page. */
export const TECH_TAG_TO_SKILL: Record<string, string> = {
  WordPress: 'wordpress',
  React: 'react',
  'React.js': 'react',
  'Node.js': 'nodejs',
  NodeJS: 'nodejs',
  MongoDB: 'mongodb',
  Figma: 'figma',
  n8n: 'n8n',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  'Next.js': 'nextjs',
  PHP: 'php',
  Tailwind: 'tailwindcss',
  'Tailwind CSS': 'tailwindcss',
  WooCommerce: 'woocommerce',
  Git: 'git',
  HTML5: 'html5',
  MySQL: 'mysql',
};
