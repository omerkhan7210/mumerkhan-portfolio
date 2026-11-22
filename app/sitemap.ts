import type { MetadataRoute } from 'next';
import projects from '@/data/projects.json';
import { services } from '@/data/services';
import { posts } from '@/data/blog';
import { skills } from '@/data/skills';

const SITE_URL = 'https://mumerkhan.com';
/* Real last-changed date: a lastModified of "now" on every build teaches Google to ignore it.
   Bump this when pages other than blog posts change. */
const UPDATED = new Date('2026-11-22');

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/work`, lastModified: UPDATED, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/skills`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/pricing`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/tools`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/tools/website-cost-calculator`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/tools/automation-roi-calculator`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${SITE_URL}/blog`, lastModified: UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/redesign`, lastModified: UPDATED, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/work/${p.slug}`,
    lastModified: UPDATED,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: UPDATED,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const skillRoutes: MetadataRoute.Sitemap = skills.map((s) => ({
    url: `${SITE_URL}/skills/${s.slug}`,
    lastModified: UPDATED,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...workRoutes, ...skillRoutes];
}
