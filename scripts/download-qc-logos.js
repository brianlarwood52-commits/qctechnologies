// Download QC Technologies logo files from the live site
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// QC Technologies logo URLs from Wix static media
const logos = [
  {
    name: 'QC Technologies Logo 2',
    url: 'https://static.wixstatic.com/media/cee5a1_1031d3a2c5854bea9432616055b052c0~mv2.png',
    filename: 'qc-logo.png',
  },
  {
    name: 'QC Technologies Logo RGB',
    url: 'https://www.qctechnologies.com.au/quality_auto/QC-Technologies-logo-RGB-copy.jpg',
    filename: 'qc-logo-rgb.jpg',
  },
  {
    name: 'QC Technologies Logo 2 (alternative)',
    url: 'https://www.qctechnologies.com.au/quality_auto/QC-Technologies-Logo-2.png',
    filename: 'qc-logo-2.png',
  },
];

const outputDir = path.join(__dirname, '..', 'public');

// Create public directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
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
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function downloadLogos() {
  console.log('📥 Downloading QC Technologies logos...\n');
  
  let successCount = 0;
  
  for (const logo of logos) {
    const filepath = path.join(outputDir, logo.filename);
    
    try {
      await downloadFile(logo.url, filepath);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to download ${logo.name}:`, error.message);
    }
  }
  
  console.log(`\n✅ Downloaded ${successCount}/${logos.length} logos!`);
  
  if (successCount > 0) {
    console.log('\n📝 Logo files saved to public/ directory');
    console.log('   You can now use them in your components with:');
    console.log('   - /qc-logo.png');
    console.log('   - /qc-logo-rgb.jpg');
    console.log('   - /qc-logo-2.png');
  }
}

downloadLogos().catch(console.error);

