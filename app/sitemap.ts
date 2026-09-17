import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/innovation', '/books', '/portals', '/careport', '/interest', '/solutions/healthcare', '/solutions/nonprofit', '/solutions/retail', '/partnerships', '/reentry', '/launch', '/media-kit', '/waitlist', '/privacy', '/terms'];
  return pages.map((path, index) => ({
    url: `https://mackprojekt.com${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }));
}
