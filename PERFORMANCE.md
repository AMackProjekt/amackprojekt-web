# Performance Optimization Guide for AMP Website

## Current Performance Issues

### Load Time Optimization

1. **Image Optimization**
   - Currently using `unoptimized: true` in next.config.js
   - For production, consider using a CDN for images
   - Implement lazy loading for all images below the fold

2. **Code Splitting**
   - Ensure all large components use dynamic imports
   - Use React.lazy() for route-based code splitting

3. **Bundle Size**
   - Run `npm run build` to check bundle sizes
   - Consider removing unused dependencies
   - Use tree-shaking compatible libraries

## Quick Performance Checks

### Run Lighthouse Audit
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://mackprojekt.com --view
```

### Check Bundle Size
```bash
npm run build
# Review the output for large bundles
```

### Analyze Bundle
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js:
# const withBundleAnalyzer = require('@next/bundle-analyzer')({
#   enabled: process.env.ANALYZE === 'true',
# })

# Run analysis
ANALYZE=true npm run build
```

## Performance Improvements

### 1. Image Optimization (Priority: HIGH)
- Convert large images to WebP format
- Use responsive images with srcSet
- Implement lazy loading
- Add proper width/height attributes

### 2. Font Loading (Priority: MEDIUM)
- Use font-display: swap
- Preload critical fonts
- Consider using system fonts as fallback

### 3. JavaScript Optimization (Priority: HIGH)
- Enable minification (already in production)
- Remove console.logs in production
- Use dynamic imports for heavy components

### 4. CSS Optimization (Priority: MEDIUM)
- PurgeCSS is already enabled via Tailwind
- Remove unused CSS
- Consider critical CSS inline

### 5. Caching Strategy (Priority: HIGH)
- Set proper cache headers in Azure Static Web Apps
- Use service worker for offline support (already implemented)
- Enable CDN caching

### 6. Network Optimization (Priority: HIGH)
- Enable HTTP/2
- Enable compression (gzip/brotli)
- Use CDN for static assets

### 7. Rendering Optimization (Priority: MEDIUM)
- Use React.memo for expensive components
- Implement virtual scrolling for long lists
- Reduce re-renders with useCallback/useMemo

## Responsive Design Improvements

### Mobile Optimization
1. **Viewport Configuration** ✅ Already implemented
2. **Touch Targets** - Ensure all buttons are at least 48x48px
3. **Mobile Navigation** - Consider hamburger menu for small screens
4. **Responsive Images** - Use picture element for art direction

### Breakpoints (Tailwind)
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Testing
```bash
# Test responsive design
npm run dev
# Open Chrome DevTools > Toggle device toolbar
# Test on: iPhone SE, iPhone 12 Pro, iPad, Desktop
```

## Monitoring

### Google Analytics Setup ✅
Already configured with:
- Page views tracking
- Custom event tracking (QR scans, video plays, shares)
- User engagement metrics

### Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

### Performance Budget
- JavaScript Bundle: < 200KB
- CSS Bundle: < 50KB
- Total Page Size: < 1MB
- Time to Interactive: < 3.5s

## Implementation Checklist

- [ ] Run Lighthouse audit and fix critical issues
- [ ] Optimize all images (convert to WebP, add lazy loading)
- [ ] Enable compression in Azure Static Web Apps
- [ ] Add proper cache headers
- [ ] Implement dynamic imports for heavy components
- [ ] Test on real mobile devices
- [ ] Monitor Core Web Vitals in Google Analytics
- [ ] Set up performance budget alerts
- [ ] Optimize third-party scripts
- [ ] Review and remove unused dependencies

## Azure Static Web Apps Configuration

Add to `staticwebapp.config.json`:
```json
{
  "routes": [
    {
      "route": "/*",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    }
  ],
  "navigationFallback": {
    "rewrite": "/index.html"
  },
  "responseOverrides": {
    "404": {
      "rewrite": "/404.html"
    }
  },
  "mimeTypes": {
    ".json": "application/json",
    ".webp": "image/webp"
  },
  "globalHeaders": {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'self'"
  }
}
```

## Next Steps

1. **Immediate** (Next 24 hours)
   - Run Lighthouse audit
   - Optimize hero image
   - Add lazy loading to images

2. **Short Term** (Next week)
   - Implement dynamic imports
   - Add cache headers
   - Test mobile responsiveness

3. **Long Term** (Next month)
   - Set up performance monitoring
   - Implement progressive enhancement
   - A/B test performance improvements
