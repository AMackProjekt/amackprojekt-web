# Logo Assets

Place your logo and brand assets in this directory.

## Required Files

### 1. Primary Logo
- **File**: `primary-logo.png` or `primary-logo.svg`
- **Purpose**: Main logo displayed in navigation header
- **Recommended Size**: 300x80px (PNG) or scalable (SVG)
- **Format**: PNG with transparent background, or SVG

### 2. Icon/Favicon
- **File**: `icon.png`
- **Purpose**: Browser favicon, mobile home screen icon
- **Recommended Size**: 512x512px
- **Format**: PNG with transparent background

### 3. Open Graph Image (Optional)
- **File**: `og-image.png`
- **Purpose**: Social media preview image when sharing links
- **Recommended Size**: 1200x630px
- **Format**: PNG or JPG

## Quick Setup

1. Export your logo from your design tool (Figma, Adobe, etc.)
2. Rename files according to the naming convention above
3. Place files in this directory
4. Update references in `app/layout.tsx` if using different filenames

## Optimization Tips

### For PNG Files
```bash
# Install sharp-cli
npm install -g sharp-cli

# Optimize PNG
sharp -i input-logo.png -o primary-logo.png --png
```

### For SVG Files
```bash
# Install svgo
npm install -g svgo

# Optimize SVG
svgo primary-logo.svg
```

## File Size Guidelines

- Primary Logo: < 50KB
- Icon: < 20KB
- OG Image: < 200KB

Smaller file sizes = faster page loads!

## Need Help?

If you don't have logo files ready:
- Use a placeholder generator: https://placeholder.com/
- Or keep the existing placeholder files temporarily
- Contact your designer for optimized assets

---

**Note**: After updating logos, clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R) to see changes immediately.
