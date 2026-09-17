import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/messaging/', '/api-test/'] },
    sitemap: 'https://mackprojekt.com/sitemap.xml',
    host: 'https://mackprojekt.com',
  };
}
