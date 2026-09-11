import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/messaging/'] },
    sitemap: 'https://mackprojekt.com/sitemap.xml',
    host: 'https://mackprojekt.com',
  };
}
