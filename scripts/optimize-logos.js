import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOGOS_DIR = join(__dirname, '..', 'public', 'logos');
const SIZES = [
  { suffix: '', width: 160 },
  { suffix: '@2x', width: 320 }
];

async function optimizeLogos() {
  try {
    const files = await readdir(LOGOS_DIR);
    const pngFiles = files.filter(f => 
      f.endsWith('.png') && 
      !f.includes('@') && 
      !f.includes('-optimized')
    );

    for (const file of pngFiles) {
      const filePath = join(LOGOS_DIR, file);
      const { name } = parse(file);

      console.log(`Processing ${file}...`);

      // Generate optimized versions
      for (const size of SIZES) {
        const outputName = size.suffix ? `${name}${size.suffix}` : `${name}-optimized`;
        
        // PNG (optimized)
        await sharp(filePath)
          .resize(size.width, null, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .png({ quality: 90, compressionLevel: 9 })
          .toFile(join(LOGOS_DIR, `${outputName}.png`));

        // WebP
        await sharp(filePath)
          .resize(size.width, null, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .webp({ quality: 85 })
          .toFile(join(LOGOS_DIR, `${name}${size.suffix}.webp`));

        console.log(`  ✓ Generated ${outputName}.png and ${name}${size.suffix}.webp`);
      }

      // Generate SVG-compatible version (for manual conversion if needed)
      const metadata = await sharp(filePath).metadata();
      console.log(`  Info: ${metadata.width}x${metadata.height}px`);
    }

    console.log('\n✅ Logo optimization complete!');
  } catch (error) {
    console.error('Error optimizing logos:', error);
    process.exit(1);
  }
}

optimizeLogos();
