"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Wrench, Clock, MapPin, Phone } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Wide Range",
    description: "Products for trucks, 4WDs, caravans, and trailers",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Premium brands and products you can trust",
  },
  {
    icon: Wrench,
    title: "Expert Advice",
    description: "Professional guidance for your specific needs",
  },
  {
    icon: Clock,
    title: "Convenient Hours",
    description: "Mon-Fri 9-5, Saturday 9-12",
  },
  {
    icon: MapPin,
    title: "Bayswater Location",
    description: "Easy access in Western Australia",
  },
  {
    icon: Phone,
    title: "Easy Contact",
    description: "Call 0423 102 488 for assistance",
  },
];

export default function Features() {
  return (
    <section className="section-padding bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-oswald text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Why Choose <span className="text-gradient">QC Technologies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all group"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                      <Icon className="text-red-500" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-oswald text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

