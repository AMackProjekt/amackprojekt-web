const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function removeWhiteBackground(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    // Remove white background by making it transparent
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const { width, height, channels } = info;
        
        // Process pixels to make white/near-white transparent
        for (let i = 0; i < data.length; i += channels) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // If pixel is white or very light (threshold can be adjusted)
          if (r > 240 && g > 240 && b > 240) {
            data[i + 3] = 0; // Set alpha to 0 (transparent)
          }
        }
        
        return sharp(data, {
          raw: {
            width,
            height,
            channels
          }
        })
        .png()
        .toFile(outputPath);
      });
    
    console.log(`✓ Processed: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function processLogos() {
  const logosDir = path.join(__dirname, '../public/logos');
  
  // Process org-logo-2 (current navbar logo)
  const logo2Path = path.join(logosDir, 'org-logo-2.png');
  const logo2OutputPath = path.join(logosDir, 'org-logo-2-transparent.png');
  
  if (fs.existsSync(logo2Path)) {
    await removeWhiteBackground(logo2Path, logo2OutputPath);
    
    // Also create WebP version and 2x versions
    await sharp(logo2OutputPath)
      .resize(160, null, { fit: 'inside' })
      .webp({ quality: 90 })
      .toFile(path.join(logosDir, 'org-logo-2-transparent.webp'));
    
    await sharp(logo2OutputPath)
      .resize(320, null, { fit: 'inside' })
      .png()
      .toFile(path.join(logosDir, 'org-logo-2-transparent@2x.png'));
    
    await sharp(logo2OutputPath)
      .resize(320, null, { fit: 'inside' })
      .webp({ quality: 90 })
      .toFile(path.join(logosDir, 'org-logo-2-transparent@2x.webp'));
    
    console.log('✓ All transparent versions created');
  } else {
    console.log('✗ org-logo-2.png not found');
  }
}

processLogos().catch(console.error);
