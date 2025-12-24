// Extract product data from downloaded HTML files
const fs = require('fs');
const path = require('path');

const productDir = path.join('C:', 'Downloaded Web Sites', 'www.qctechnologies.com.au', 'product-page');
const outputFile = path.join(__dirname, '..', 'data', 'extracted-products.json');

const products = [];

// Product categories mapping
const categoryMap = {
  'toolbox': 'toolboxes',
  'msv': 'toolboxes',
  'canopy': 'toolboxes',
  'dog': 'toolboxes',
  'tail': 'tail-lights',
  'oar': 'tail-lights',
  'rwl': 'led-lights',
  'rb': 'led-lights',
  'br': 'led-lights',
  'azur': 'led-lights',
  'revolver': 'led-lights',
};

const subcategoryMap = {
  'msv': 'mine-service',
  'canopy': 'canopy',
  'cmb': 'canopy',
  'str': 'canopy',
  'dog': 'dog-boxes',
  'db': 'dog-boxes',
  'rwl': 'work-lights',
  'rb': 'emergency-lights',
  'revolver': 'emergency-lights',
  'br': 'signal-lights',
  'azur': 'bike-lights',
};

function extractProductFromFile(filename) {
  const filePath = path.join(productDir, filename);
  if (!fs.existsSync(filePath)) return null;

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Extract JSON-LD product data
    const jsonMatch = content.match(/<script type="application\/ld\+json">({.*?})<\/script>/s);
    if (!jsonMatch) return null;

    const productData = JSON.parse(jsonMatch[1]);
    if (productData['@type'] !== 'Product') return null;

    // Extract product name
    const name = productData.name || filename.replace('.html', '').replace(/-/g, ' ');
    
    // Determine category
    const filenameLower = filename.toLowerCase();
    let category = 'led-lights';
    let subcategory = null;

    for (const [key, cat] of Object.entries(categoryMap)) {
      if (filenameLower.includes(key)) {
        category = cat;
        break;
      }
    }

    for (const [key, subcat] of Object.entries(subcategoryMap)) {
      if (filenameLower.includes(key)) {
        subcategory = subcat;
        break;
      }
    }

    // Extract image
    let image = '/products/placeholder.jpg';
    if (productData.image && productData.image[0]) {
      image = productData.image[0].contentUrl || productData.image[0];
    }

    // Extract description
    const description = productData.description || `${name} - Premium quality product from QC Technologies`;

    // Extract brand
    let brand = null;
    if (filenameLower.includes('redflag')) brand = 'RedFlag';
    else if (filenameLower.includes('roadvision') || filenameLower.includes('rb') || filenameLower.includes('br')) brand = 'Roadvision';
    else if (filenameLower.includes('azur')) brand = 'Azur';
    else if (filenameLower.includes('helled') || filenameLower.includes('oar')) brand = 'Helled';
    else if (filenameLower.includes('rwl')) brand = 'Roadvision';
    else if (filenameLower.includes('whitevision')) brand = 'Whitevision';

    return {
      id: filename.replace('.html', '').replace(/[^a-z0-9]/gi, '-').toLowerCase(),
      name: name,
      description: description,
      category: category,
      subcategory: subcategory,
      brand: brand,
      image: image,
      slug: filename.replace('.html', ''),
    };
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    return null;
  }
}

// Process all product files
const files = fs.readdirSync(productDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const product = extractProductFromFile(file);
  if (product) {
    products.push(product);
  }
});

// Organize by category
const organized = {
  'led-lights': {
    'work-lights': [],
    'emergency-lights': [],
    'signal-lights': [],
    'bike-lights': [],
  },
  'tail-lights': [],
  'toolboxes': {
    'canopy': [],
    'dog-boxes': [],
    'mine-service': [],
    'standard': [],
  },
};

products.forEach(product => {
  if (product.category === 'led-lights' && product.subcategory) {
    if (organized['led-lights'][product.subcategory]) {
      organized['led-lights'][product.subcategory].push(product);
    }
  } else if (product.category === 'tail-lights') {
    organized['tail-lights'].push(product);
  } else if (product.category === 'toolboxes') {
    const subcat = product.subcategory || 'standard';
    if (organized['toolboxes'][subcat]) {
      organized['toolboxes'][subcat].push(product);
    } else {
      organized['toolboxes']['standard'].push(product);
    }
  }
});

// Save extracted data
fs.writeFileSync(outputFile, JSON.stringify(organized, null, 2));
console.log(`✅ Extracted ${products.length} products`);
console.log(`   - LED Lights: ${products.filter(p => p.category === 'led-lights').length}`);
console.log(`   - Tail Lights: ${products.filter(p => p.category === 'tail-lights').length}`);
console.log(`   - Toolboxes: ${products.filter(p => p.category === 'toolboxes').length}`);

