import projects from '@/data/projects.json';
import stripImages from './strips.json';

type Project = (typeof projects)[number];
const bySlug = (slug: string) => projects.find((p) => p.slug === slug) as Project;

/* Projects shown as lit exhibits in the hero ring. Textures are 1280px WebP
   copies of each project's device mockup (public/assets/gallery). */
export const GALLERY = [
  { slug: 'kanalfuchs', kind: 'Local service' },
  { slug: 'v1-campers', kind: 'WooCommerce booking' },
  { slug: 'roaddarts', kind: 'Full-stack web app' },
  { slug: 'kp-global-consultants', kind: 'Corporate site' },
  { slug: 'isg-flooring', kind: 'Local SEO' },
  { slug: 'globalremote', kind: 'WordPress + n8n' },
  { slug: 'novara-md', kind: 'Figma to WordPress' },
  { slug: 'ialus', kind: 'Nonprofit' },
  { slug: 'wlk-gardeners', kind: 'Rebrand' },
  { slug: 'cleverconcept', kind: 'Custom WordPress' },
  { slug: 'fogana', kind: 'Community site' },
  { slug: 'kings-capital', kind: 'Next.js site' },
].map((g) => {
  const p = bySlug(g.slug);
  return {
    slug: g.slug,
    title: p.title,
    kind: g.kind,
    year: p.year,
    texture: `/assets/gallery/${g.slug}.webp`,
    href: `/work/${g.slug}`,
  };
});

export type GalleryItem = (typeof GALLERY)[number];

export type Filter = 'All' | 'Websites' | 'E-commerce' | 'Apps & automation' | 'Trades';

/* Work strips: every project, with the pictures that exist for it and tags derived from its category. */
const TRADES = ['kanalfuchs', 'erbs-ltd', 'isg-flooring', 'wlk-gardeners', 'bright-home'];

function tagsFor(p: Project): Filter[] {
  const c = p.category.toLowerCase();
  const t: Filter[] = [];
  if (/commerce|woocommerce|store|shop/.test(c)) t.push('E-commerce');
  if (/app|automation|full-stack|platform|react/.test(c)) t.push('Apps & automation');
  if (!t.length || /website|wordpress|site|figma|rebrand|seo/.test(c)) t.push('Websites');
  if (TRADES.includes(p.slug)) t.push('Trades');
  return t;
}

export type Strip = {
  slug: string; title: string; category: string; year: string; tags: Filter[];
  images: { src: string; w: number; h: number }[]; result: string; tech: string[];
};

export const ALL_STRIPS: Strip[] = projects.map((p) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  year: p.year,
  tags: tagsFor(p),
  images: (stripImages as Record<string, Strip['images']>)[p.slug] ?? [],
  result: (p.results as string[] | undefined)?.[0] ?? p.description,
  tech: (p.technologies as string[]) ?? [],
}));

const HOME = ['kanalfuchs', 'v1-campers', 'roaddarts', 'erbs-ltd', 'kp-global-consultants', 'globalremote', 'wetotalcare', 'isg-flooring', 'novara-md', 'house-of-greens', 'drivco-auction', 'wlk-gardeners'];
export const STRIPS = HOME.map((s) => ALL_STRIPS.find((x) => x.slug === s)!);
