const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Hero images from the live site
const heroImages = [
  {
    url: 'https://static.wixstatic.com/media/a8e1f3e15ccb41b88df85a10bb90531a.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/a8e1f3e15ccb41b88df85a10bb90531a.jpg',
    filename: 'hero-1.jpg',
    alt: 'LED Lights on Truck'
  },
  {
    url: 'https://static.wixstatic.com/media/cee5a1_2b5ff594ef134a56ad09f44b7c687892~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cee5a1_2b5ff594ef134a56ad09f44b7c687892~mv2.jpg',
    filename: 'hero-2.jpg',
    alt: 'New Range LED Tail Lights'
  },
  {
    url: 'https://static.wixstatic.com/media/cee5a1_e32e4bd3a996443da6e0aa7ead86d345~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cee5a1_e32e4bd3a996443da6e0aa7ead86d345~mv2.jpg',
    filename: 'hero-3.jpg',
    alt: 'OAR800 Series LED Trailer Lights'
  },
  {
    url: 'https://static.wixstatic.com/media/cee5a1_14165c143dd04fbb9c0ec8bb7e676cef~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cee5a1_14165c143dd04fbb9c0ec8bb7e676cef~mv2.jpg',
    filename: 'hero-4.jpg',
    alt: 'OARW300 Series LED Truck Tail Lights'
  },
  {
    url: 'https://static.wixstatic.com/media/cee5a1_e5cea94e475a402d8d831c4df045f0b0~mv2.jpg/v1/fill/w_1920,h_1080,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cee5a1_e5cea94e475a402d8d831c4df045f0b0~mv2.jpg',
    filename: 'hero-5.jpg',
    alt: 'OARW258 Series Truck Trailer Ute Tail Lights'
  }
];

const heroDir = path.join(__dirname, '..', 'public', 'hero');

// Create directory if it doesn't exist
if (!fs.existsSync(heroDir)) {
  fs.mkdirSync(heroDir, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirect
        return downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(filepath);
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('📥 Downloading hero images from live site...\n');
  
  for (let i = 0; i < heroImages.length; i++) {
    const image = heroImages[i];
    const filepath = path.join(heroDir, image.filename);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping ${image.filename} (already exists)`);
      continue;
    }
    
    try {
      console.log(`⬇️  Downloading ${image.filename}...`);
      await downloadImage(image.url, filepath);
      console.log(`✅ Downloaded ${image.filename}`);
    } catch (error) {
      console.error(`❌ Failed to download ${image.filename}:`, error.message);
    }
  }
  
  console.log('\n✨ Done!');
}

downloadAll();

