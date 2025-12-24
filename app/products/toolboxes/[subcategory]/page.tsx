import ProductGrid from "@/components/ProductGrid";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProducts } from "@/lib/cms";

const subcategoryNames: Record<string, { title: string; description: string }> = {
  "canopy": {
    title: "Canopy Toolboxes",
    description: "Full lid gullwing canopy toolboxes in various sizes, perfect for utes and trucks",
  },
  "dog-boxes": {
    title: "Dog Boxes",
    description: "Heavy-duty dog boxes designed for maximum durability and storage capacity",
  },
  "mine-service": {
    title: "Mine Service Toolboxes",
    description: "Robust mine service vehicle toolboxes built to withstand harsh mining conditions",
  },
  "standard": {
    title: "Standard Toolboxes",
    description: "Quality toolboxes for all your storage needs",
  },
};

export async function generateStaticParams() {
  return [
    { subcategory: "canopy" },
    { subcategory: "dog-boxes" },
    { subcategory: "mine-service" },
    { subcategory: "standard" },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const subcat = subcategoryNames[subcategory] || { title: subcategory, description: "" };
  return {
    title: `${subcat.title} | Toolboxes | QC Technologies`,
    description: subcat.description,
  };
}

export default async function ToolboxSubcategoryPage({ params }: { params: Promise<{ subcategory: string }> }) {
  const { subcategory } = await params;
  const subcat = subcategoryNames[subcategory] || { 
    title: subcategory.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()), 
    description: "" 
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products/toolboxes"
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Toolboxes</span>
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
        <ProductGrid category="toolboxes" subcategory={subcategory} />
      </div>
    </div>
  );
}

