const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Brand websites and their logo filenames
const brands = [
  {
    name: 'RedFlag',
    url: 'https://redflagindustries.com.au/',
    filename: 'redflag.png',
  },
  {
    name: 'Whitevision',
    url: 'https://www.whitevision.com.au/',
    filename: 'whitevision.png',
  },
  {
    name: 'Champion',
    url: 'https://championfasteners.com.au/',
    filename: 'champion.png',
  },
  {
    name: 'Thunder',
    url: 'https://www.napaparts.com.au/',
    filename: 'thunder.png',
  },
  {
    name: 'Roadvision',
    url: 'https://roadvision.com.au/',
    filename: 'roadvision.png',
  },
  {
    name: 'OEX',
    url: 'https://www.oex.com.au/',
    filename: 'oex.png',
  },
];

const brandsDir = path.join(__dirname, '..', 'public', 'brands');

// Create directory if it doesn't exist
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

// Logo URLs from the live QC Technologies site (we already found these)
const logoUrls = {
  redflag: 'https://static.wixstatic.com/media/cee5a1_1f5c44e2d9094d6ab7228b575e22d930~mv2.png/v1/fill/w_500,h_150,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Red-Flag-Tool-Box-Logo.png',
  whitevision: 'https://static.wixstatic.com/media/cee5a1_ab8c156e356944e6b6a80bc031b481db~mv2.png/v1/fill/w_500,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/whitevision-logo.png',
  champion: 'https://static.wixstatic.com/media/cee5a1_1fc8728591dd4903b462d388eaa9c4f8~mv2.jpg/v1/fill/w_500,h_90,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Champion-parts-logo.jpg',
  thunder: 'https://static.wixstatic.com/media/cee5a1_a3cbf0b35c9540abb0b720cd594514a8~mv2.png/v1/fill/w_500,h_120,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/thunder-logo.png',
  roadvision: 'https://static.wixstatic.com/media/cee5a1_b817939920fa43b4a8f6520e1a83dcd4~mv2.jpg/v1/fill/w_500,h_150,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Roadvision-Corporate-Logo-2013-Colour-2-300x82.jpg',
  oex: 'https://static.wixstatic.com/media/cee5a1_39684270587e47fb8a891adec8773ca7~mv2.jpg/v1/fill/w_500,h_300,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/OEX-Australia-Logo.jpg',
};

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
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
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
  console.log('📥 Downloading brand logos...\n');
  
  const downloads = [
    { url: logoUrls.redflag, filename: 'redflag.png' },
    { url: logoUrls.whitevision, filename: 'whitevision.png' },
    { url: logoUrls.champion, filename: 'champion.png' },
    { url: logoUrls.thunder, filename: 'thunder.png' },
    { url: logoUrls.roadvision, filename: 'roadvision.png' },
    { url: logoUrls.oex, filename: 'oex.png' },
  ];
  
  for (const download of downloads) {
    const filepath = path.join(brandsDir, download.filename);
    
    // Skip if already exists
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Skipping ${download.filename} (already exists)`);
      continue;
    }
    
    try {
      console.log(`⬇️  Downloading ${download.filename}...`);
      await downloadImage(download.url, filepath);
      console.log(`✅ Downloaded ${download.filename}`);
    } catch (error) {
      console.error(`❌ Failed to download ${download.filename}:`, error.message);
    }
  }
  
  console.log('\n✨ Done!');
}

downloadAll();

