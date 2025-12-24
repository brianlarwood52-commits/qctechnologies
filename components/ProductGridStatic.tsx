"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/cms";

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

export default function ProductGridStatic({ category, subcategory }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use CMS directly instead of API route for static export
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
            href={`/products/${product.category}/${product.slug || product.id}`}
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

