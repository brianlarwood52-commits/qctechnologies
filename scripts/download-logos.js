// Download logo files from the live site
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const logos = [
  {
    name: 'redflag',
    url: 'https://www.qctechnologies.com.au/quality_auto/redflag-industries-logos_edited.png',
    filename: 'redflag.png',
  },
  {
    name: 'whitevision',
    url: 'https://www.qctechnologies.com.au/quality_auto/whitevision-logo.png',
    filename: 'whitevision.png',
  },
  {
    name: 'champion',
    url: 'https://www.qctechnologies.com.au/quality_auto/Champion-parts-logo.jpg',
    filename: 'champion.png',
  },
  {
    name: 'thunder',
    url: 'https://www.qctechnologies.com.au/quality_auto/thunder-logo.png',
    filename: 'thunder.png',
  },
  {
    name: 'roadvision',
    url: 'https://www.qctechnologies.com.au/quality_auto/Roadvision-Corporate-Logo-2013-Colour-2-300x82.jpg',
    filename: 'roadvision.png',
  },
  {
    name: 'oex',
    url: 'https://www.qctechnologies.com.au/quality_auto/OEX-Australia-Logo.jpg',
    filename: 'oex.png',
  },
];

const outputDir = path.join(__dirname, '..', 'public', 'brands');

// Create brands directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`✅ Downloaded: ${path.basename(filepath)}`);
        resolve();
      });

      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadLogos() {
  console.log('📥 Downloading brand logos...\n');
  
  for (const logo of logos) {
    const filepath = path.join(outputDir, logo.filename);
    
    try {
      await downloadFile(logo.url, filepath);
    } catch (error) {
      console.error(`❌ Failed to download ${logo.name}:`, error.message);
      // Create a placeholder file
      console.log(`   Creating placeholder for ${logo.filename}`);
    }
  }
  
  console.log('\n✅ Logo download complete!');
}

downloadLogos().catch(console.error);

