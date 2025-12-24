// Create proper sized placeholder icons
// These are simple red squares with "QC" text
// Replace with actual logo in production

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const createSVGIcon = (size) => {
  return `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dc2626;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#991b1b;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad${size})" rx="${size * 0.2}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.35}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">QC</text>
</svg>`;
};

const publicDir = path.join(__dirname, '..', 'public');

// For now, we'll use SVG icons which work better
// In production, convert these to PNG using a tool like sharp or imagemagick
fs.writeFileSync(path.join(publicDir, 'icon-192.svg'), createSVGIcon(192));
fs.writeFileSync(path.join(publicDir, 'icon-512.svg'), createSVGIcon(512));

console.log('SVG icons created. For production, convert to PNG using your logo.');

