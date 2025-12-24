"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, Wrench, Car } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "tail-lights",
    title: "LED Tail Lights",
    description: "Premium Helled LED tail lights for enhanced visibility and style",
    icon: Car,
    href: "/products/tail-lights",
    image: "/products/tail-lights.jpg",
    gradient: "from-red-600 to-orange-600",
  },
  {
    id: "work-lights",
    title: "Work Lights",
    description: "High-performance LED work lights for trucks and 4WDs",
    icon: Zap,
    href: "/products/led-lights",
    image: "/products/work-lights.jpg",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: "toolboxes",
    title: "Trade Toolboxes",
    description: "Durable RedFlag trade toolboxes built to last",
    icon: Wrench,
    href: "/products/toolboxes",
    image: "/products/toolboxes.jpg",
    gradient: "from-blue-600 to-indigo-600",
  },
];

export default function ProductCategories() {
  return (
    <section className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Our <span className="text-gradient">Product Range</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium automotive lighting and storage solutions for professionals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={category.href}
                  className="group relative block h-full bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all hover:shadow-2xl hover:shadow-red-500/20"
                >
                  {/* Image Background */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="text-white/20 group-hover:text-white/40 transition-colors" size={120} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`text-red-500 group-hover:scale-110 transition-transform`} size={32} />
                      <ArrowRight className="text-gray-500 group-hover:text-red-500 group-hover:translate-x-2 transition-all" size={24} />
                    </div>
                    <h3 className="font-oswald text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-600/0 to-red-600/0 group-hover:from-red-600/10 group-hover:to-transparent transition-all pointer-events-none"></div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

