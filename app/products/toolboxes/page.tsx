import ProductGrid from "@/components/ProductGrid";
import SubcategoryLinks from "@/components/SubcategoryLinks";
import { getProducts } from "@/lib/cms";

export const metadata = {
  title: "Trade Toolboxes | QC Technologies",
  description: "Durable RedFlag trade toolboxes built to last for professionals",
};

const subcategories = [
  {
    id: "canopy",
    name: "Canopy Toolboxes",
    description: "Full lid gullwing canopy toolboxes in various sizes",
    href: "/products/toolboxes/canopy",
  },
  {
    id: "dog-boxes",
    name: "Dog Boxes",
    description: "Heavy-duty dog boxes designed for maximum durability",
    href: "/products/toolboxes/dog-boxes",
  },
  {
    id: "mine-service",
    name: "Mine Service",
    description: "Robust mine service vehicle toolboxes for harsh conditions",
    href: "/products/toolboxes/mine-service",
  },
];

export default async function ToolboxesPage() {
  const allProducts = await getProducts("toolboxes");
  
  const subcategoriesWithCounts = subcategories.map((subcat) => ({
    ...subcat,
    count: allProducts.filter((p) => p.subcategory === subcat.id).length,
  }));

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            Trade <span className="text-gradient">Toolboxes</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium storage solutions for professionals on the go
          </p>
        </div>
        <SubcategoryLinks subcategories={subcategoriesWithCounts} basePath="/products/toolboxes" />
        <div className="mt-12">
          <h2 className="font-oswald text-3xl font-bold text-white mb-8">All Toolboxes</h2>
          <ProductGrid category="toolboxes" />
        </div>
      </div>
    </div>
  );
}

