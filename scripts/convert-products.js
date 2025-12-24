// Convert extracted products to flat array format
const fs = require('fs');
const path = require('path');

const extractedFile = path.join(__dirname, '..', 'data', 'extracted-products.json');
const outputFile = path.join(__dirname, '..', 'data', 'products.json');

const extracted = JSON.parse(fs.readFileSync(extractedFile, 'utf-8'));
const products = [];

// Flatten the structure
function flattenProducts(data, category, subcategory = null) {
  if (Array.isArray(data)) {
    data.forEach(product => {
      products.push({
        ...product,
        category: category || product.category,
        subcategory: subcategory || product.subcategory || null,
      });
    });
  } else if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      flattenProducts(data[key], category, key);
    });
  }
}

// Process LED lights
if (extracted['led-lights']) {
  Object.keys(extracted['led-lights']).forEach(subcat => {
    flattenProducts(extracted['led-lights'][subcat], 'led-lights', subcat);
  });
}

// Process tail lights
if (extracted['tail-lights']) {
  flattenProducts(extracted['tail-lights'], 'tail-lights');
}

// Process toolboxes
if (extracted['toolboxes']) {
  Object.keys(extracted['toolboxes']).forEach(subcat => {
    flattenProducts(extracted['toolboxes'][subcat], 'toolboxes', subcat);
  });
}

// Clean up HTML entities in descriptions
products.forEach(p => {
  if (p.description) {
    p.description = p.description
      .replace(/&amp;amp;/g, '&')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }
  if (!p.description || p.description === ' ') {
    p.description = `${p.name} - Premium quality product from QC Technologies`;
  }
});

const output = { products };
fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
console.log(`✅ Converted ${products.length} products to flat format`);
console.log(`   - LED Lights: ${products.filter(p => p.category === 'led-lights').length}`);
console.log(`   - Tail Lights: ${products.filter(p => p.category === 'tail-lights').length}`);
console.log(`   - Toolboxes: ${products.filter(p => p.category === 'toolboxes').length}`);

