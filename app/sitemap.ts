import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/innovation', '/solutions/healthcare', '/solutions/nonprofit', '/solutions/retail', '/partnerships', '/reentry', '/launch', '/media-kit', '/waitlist', '/privacy', '/terms'];
  return pages.map((path, index) => ({
    url: `https://mackprojekt.com${path || '/'}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? 'weekly' : 'monthly',
    priority: index === 0 ? 1 : 0.7,
  }));
}
