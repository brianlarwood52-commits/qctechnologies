// Build script for static export (cPanel)
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔨 Building static export for cPanel...\n');

// Step 1: Backup current next.config.ts
const configPath = path.join(__dirname, '..', 'next.config.ts');
const staticConfigPath = path.join(__dirname, '..', 'next.config.static.ts');
const backupPath = path.join(__dirname, '..', 'next.config.backup.ts');

if (fs.existsSync(configPath)) {
  console.log('📋 Backing up next.config.ts...');
  fs.copyFileSync(configPath, backupPath);
}

// Step 2: Copy static config to main config
console.log('📋 Using static export configuration...');
fs.copyFileSync(staticConfigPath, configPath);

// Step 3: Update ProductGrid to use client-side CMS
console.log('🔄 Updating ProductGrid for static export...');
const productGridPath = path.join(__dirname, '..', 'components', 'ProductGrid.tsx');

// Write the static version directly
const staticProductGrid = `"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/cms-client";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  brand?: string;
  slug?: string;
}

interface ProductGridProps {
  category: string;
  subcategory?: string;
}

export default function ProductGrid({ category, subcategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use client-side CMS for static export
    getProducts(category, subcategory)
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [category, subcategory]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Products will appear here once added through the CMS.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          The CMS integration is ready - products can be managed easily!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={\`/products/\${product.category}/\${product.slug || product.id}\`}
            className="block bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all group"
          >
            <div className="relative h-64 bg-gray-900">
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized
              />
              {product.brand && (
                <div className="absolute top-2 right-2 bg-red-600/90 px-2 py-1 rounded text-xs font-semibold text-white">
                  {product.brand}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-oswald text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
`;

fs.writeFileSync(productGridPath, staticProductGrid);

// Step 3b: Copy products.json to public/data for static export
console.log('📋 Copying products.json to public folder...');
const dataDir = path.join(__dirname, '..', 'public', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
fs.copyFileSync(
  path.join(__dirname, '..', 'data', 'products.json'),
  path.join(dataDir, 'products.json')
);

// Step 3c: Delete API route (can't export API routes statically, and we're using client-side CMS)
console.log('🔄 Removing API route for static export...');
const apiRoutePath = path.join(__dirname, '..', 'app', 'api');
const apiRouteBackup = path.join(__dirname, '..', '..', 'api.backup.temp');
if (fs.existsSync(apiRoutePath)) {
  // Backup first (outside project to avoid Next.js scanning it)
  if (fs.existsSync(apiRouteBackup)) {
    fs.rmSync(apiRouteBackup, { recursive: true, force: true });
  }
  fs.cpSync(apiRoutePath, apiRouteBackup, { recursive: true });
  // Delete from app directory
  fs.rmSync(apiRoutePath, { recursive: true, force: true });
}

// Step 4: Clean build cache
console.log('🧹 Cleaning build cache...');
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
}

// Step 5: Build
console.log('🏗️  Building static export...\n');
try {
  execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
  console.log('\n✅ Static export build complete!');
  console.log('📁 Output folder: out/');
  console.log('\n📤 To deploy to cPanel:');
  console.log('   1. Upload all contents of the "out" folder to your public_html directory');
  console.log('   2. Make sure .htaccess file is uploaded (if generated)');
  console.log('   3. Your site will be available at your domain');
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Step 5: Restore original config
  console.log('\n🔄 Restoring original configuration...');
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, configPath);
    fs.unlinkSync(backupPath);
  }
  
  // Restore API route
  console.log('🔄 Restoring API route...');
  const apiRoutePath = path.join(__dirname, '..', 'app', 'api');
  const apiRouteBackup = path.join(__dirname, '..', '..', 'api.backup.temp');
  if (fs.existsSync(apiRouteBackup)) {
    if (fs.existsSync(apiRoutePath)) {
      fs.rmSync(apiRoutePath, { recursive: true, force: true });
    }
    fs.cpSync(apiRouteBackup, apiRoutePath, { recursive: true });
    fs.rmSync(apiRouteBackup, { recursive: true, force: true });
  }

  // Restore original ProductGrid
  console.log('🔄 Restoring original ProductGrid...');
  const originalProductGrid = `"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  brand?: string;
  slug?: string;
}

interface ProductGridProps {
  category: string;
  subcategory?: string;
}

export default function ProductGrid({ category, subcategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = subcategory 
      ? \`/api/products?category=\${category}&subcategory=\${subcategory}\`
      : \`/api/products?category=\${category}\`;
    
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [category, subcategory]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        <p className="mt-4 text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-400 text-lg">
          Products will appear here once added through the CMS.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          The CMS integration is ready - products can be managed easily!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <Link
            href={\`/products/\${product.category}/\${product.slug || product.id}\`}
            className="block bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all group"
          >
            <div className="relative h-64 bg-gray-900">
              <Image
                src={product.image || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              {product.brand && (
                <div className="absolute top-2 right-2 bg-red-600/90 px-2 py-1 rounded text-xs font-semibold text-white">
                  {product.brand}
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="font-oswald text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2">
                {product.description}
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
`;
  fs.writeFileSync(productGridPath, originalProductGrid);
  console.log('✅ Restored original files');
}

