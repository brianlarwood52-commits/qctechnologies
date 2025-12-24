// Create proper PNG icons from SVG
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

// Create a simple red square with QC text as PNG
const createPNGIcon = async (size) => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#991b1b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad${size})" rx="${size * 0.2}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.35}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">QC</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(publicDir, `icon-${size}.png`));
  
  console.log(`Created icon-${size}.png`);
};

(async () => {
  try {
    await createPNGIcon(192);
    await createPNGIcon(512);
    console.log('PNG icons created successfully!');
  } catch (error) {
    console.error('Error creating icons:', error);
    console.log('Falling back to simple placeholder...');
    // Fallback: create minimal valid PNGs
    const minimalPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
    fs.writeFileSync(path.join(publicDir, 'icon-192.png'), minimalPNG);
    fs.writeFileSync(path.join(publicDir, 'icon-512.png'), minimalPNG);
  }
})();

