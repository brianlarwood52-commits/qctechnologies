import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProducts } from "@/lib/cms";

const subcategoryNames: Record<string, { title: string; description: string }> = {
  "work-lights": {
    title: "Work Lights",
    description: "High-performance LED work lights for trucks, 4WDs, and commercial vehicles",
  },
  "emergency-lights": {
    title: "Emergency Lights",
    description: "Professional emergency and warning lights with multiple flash patterns",
  },
  "signal-lights": {
    title: "Signal Lights",
    description: "ADR approved signal lights for enhanced visibility and safety",
  },
  "bike-lights": {
    title: "Bike Lights",
    description: "Rechargeable and battery-powered bike lights for cycling safety",
  },
};

export async function generateStaticParams() {
  return [
    { subcategory: "work-lights" },
    { subcategory: "emergency-lights" },
    { subcategory: "signal-lights" },
    { subcategory: "bike-lights" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const subcat = subcategoryNames[subcategory] || { title: subcategory, description: "" };
  return {
    title: `${subcat.title} | LED Lights | QC Technologies`,
    description: subcat.description,
  };
}

export default async function LEDSubcategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const subcat = subcategoryNames[subcategory] || { 
    title: subcategory.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), 
    description: "" 
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products/led-lights"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to LED Lights</span>
        </Link>

        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            {subcat.title}
          </h1>
          {subcat.description && (
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {subcat.description}
            </p>
          )}
        </div>
        <ProductGrid category="led-lights" subcategory={subcategory} />
      </div>
    </div>
  );
}

