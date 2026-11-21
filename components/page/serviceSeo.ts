/* Search-targeted titles and headlines per service, from the 2026-11 keyword map.
   Each H1 is two short lines; each title leads with the phrase people search. */
export const SERVICE_SEO: Record<
  string,
  { title: string; h1: [string, string]; short: string; match: RegExp }
> = {
  'wordpress-development': {
    title: 'Freelance WordPress Developer for Hire',
    h1: ['WordPress', 'developer for hire'],
    short: 'Custom WordPress sites',
    match: /wordpress|elementor/i,
  },
  'mern-stack-development': {
    title: 'Next.js & React Developer for Hire',
    h1: ['Next.js & React', 'developer'],
    short: 'Next.js & React apps',
    match: /react|next|mern|full-stack|node/i,
  },
  'n8n-automation': {
    title: 'n8n Automation Expert & Freelancer',
    h1: ['n8n automation', 'expert'],
    short: 'n8n automation',
    match: /n8n|automation|cron/i,
  },
  'figma-to-web': {
    title: 'Figma to WordPress & Elementor Developer',
    h1: ['Figma to', 'WordPress'],
    short: 'Figma to WordPress',
    match: /figma/i,
  },
  'ecommerce-development': {
    title: 'WooCommerce Developer for Online Stores',
    h1: ['WooCommerce', 'developer'],
    short: 'WooCommerce stores',
    match: /woocommerce|commerce|stripe|shop/i,
  },
  'ui-ux-design': {
    title: 'UI/UX Web Design in Figma',
    h1: ['UI/UX design', 'in Figma'],
    short: 'UI/UX design',
    match: /figma|design|brand/i,
  },
  'seo-performance': {
    title: 'Technical SEO & Website Speed Optimisation',
    h1: ['Technical SEO', '& site speed'],
    short: 'SEO & site speed',
    match: /seo|rank math|local/i,
  },
  'website-maintenance': {
    title: 'WordPress Maintenance & Care Plans',
    h1: ['Website care', '& maintenance'],
    short: 'Care & maintenance',
    match: /wordpress|maintenance|optimization/i,
  },
};
