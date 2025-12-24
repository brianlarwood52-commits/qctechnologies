"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const brands = [
  {
    name: "RedFlag Industries",
    logo: "/brands/redflag.png",
    url: "http://www.redflagindustries.com.au/",
  },
  {
    name: "Whitevision",
    logo: "/brands/whitevision.png",
    url: "http://www.whitevision.com.au/",
  },
  {
    name: "Champion Parts",
    logo: "/brands/champion.png",
    url: "https://www.championparts.com.au/",
  },
  {
    name: "Thunder Auto",
    logo: "/brands/thunder.png",
    url: "https://www.thunderauto.com.au/",
  },
  {
    name: "Roadvision",
    logo: "/brands/roadvision.png",
    url: "https://roadvision.com.au/",
  },
  {
    name: "OEX Australia",
    logo: "/brands/oex.png",
    url: "https://www.oex.com.au/",
  },
];

function BrandLogo({ brand }: { brand: typeof brands[0] }) {
  const [imageError, setImageError] = useState(false);
  const [imageExists, setImageExists] = useState<boolean | null>(null);

  // Check if image exists before trying to load
  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setImageExists(true);
    img.onerror = () => {
      setImageExists(false);
      setImageError(true);
    };
    img.src = brand.logo;
  }, [brand.logo]);

  // Show brand name if image doesn't exist or failed to load
  if (imageError || imageExists === false) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <span className="text-gray-400 text-xs text-center px-2 font-medium">{brand.name}</span>
      </div>
    );
  }

  // Show loading state while checking
  if (imageExists === null) {
    return (
      <div className="w-full h-20 flex items-center justify-center">
        <span className="text-gray-500 text-xs">{brand.name}</span>
      </div>
    );
  }

  // Image exists, render it
  return (
    <div className="relative w-full h-20 transition-all opacity-80 group-hover:opacity-100">
      <Image
        src={brand.logo}
        alt={brand.name}
        fill
        className="object-contain scale-125"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
        unoptimized
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function BrandPartners() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background texture from last slideshow image */}
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-5.jpg"
          alt="Background texture"
          fill
          className="object-cover"
          sizes="100vw"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Trusted <span className="text-gradient">Brand Partners</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We stock only the finest brands in automotive lighting and storage
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <motion.a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-300 hover:border-red-500/50 transition-all group"
            >
              <BrandLogo brand={brand} />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

