# Organization Logos

Place your organization/partner logos here.

## Recommended Specifications

### File Formats
- **SVG** (preferred) - Scalable, sharp at any size
- **WebP** - Modern format with better compression
- **PNG** - Fallback with transparency

### Sizes
For logos displayed at ~120-160px width:
- **1x**: 160px width
- **2x**: 320px width (for retina displays)
- **SVG**: No size restrictions (vector)

### Naming Convention
```
org-name.svg
org-name.png
org-name@2x.png
org-name.webp
```

### Example Structure
```
public/logos/
├── microsoft.svg
├── azure.svg
├── github.svg
├── acme-corp.svg
└── partner-org.svg
```

## Current Implementation

Logos are displayed in the "Trusted By" section on the homepage with:
- Grayscale effect (turns to color on hover)
- Automatic lazy loading
- Responsive sizing (max 128px width, 64px height)

## To Add New Logos

1. Add your logo files to this directory
2. Update the logo array in `app/page.tsx`:
   ```tsx
   { name: "Your Organization", file: "your-org.svg" }
   ```
3. Commit and push to deploy
