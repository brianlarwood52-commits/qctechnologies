"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Subcategory {
  id: string;
  name: string;
  description: string;
  count: number;
  href: string;
}

interface SubcategoryLinksProps {
  subcategories: Subcategory[];
  basePath: string;
}

export default function SubcategoryLinks({ subcategories, basePath }: SubcategoryLinksProps) {
  if (subcategories.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {subcategories.map((subcat, index) => (
        <motion.div
          key={subcat.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={subcat.href}
            className="block bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-red-500 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-oswald text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                {subcat.name}
              </h3>
              <ArrowRight className="text-gray-500 group-hover:text-red-500 group-hover:translate-x-1 transition-all" size={20} />
            </div>
            <p className="text-gray-400 text-sm mb-2">{subcat.description}</p>
            <p className="text-red-500 text-sm font-semibold">{subcat.count} products</p>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

