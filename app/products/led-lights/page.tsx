import ProductGrid from "@/components/ProductGrid";
import SubcategoryLinks from "@/components/SubcategoryLinks";
import { getProducts } from "@/lib/cms";

export const metadata = {
  title: "LED Lights | QC Technologies",
  description: "Premium LED work lights, emergency lights, signal lights, and bike lights for trucks, 4WDs, caravans, and trailers",
};

const subcategories = [
  {
    id: "work-lights",
    name: "Work Lights",
    description: "High-performance LED work lights for trucks, 4WDs, and commercial vehicles",
    href: "/products/led-lights/work-lights",
  },
  {
    id: "emergency-lights",
    name: "Emergency Lights",
    description: "Professional emergency and warning lights with multiple flash patterns",
    href: "/products/led-lights/emergency-lights",
  },
  {
    id: "signal-lights",
    name: "Signal Lights",
    description: "ADR approved signal lights for enhanced visibility and safety",
    href: "/products/led-lights/signal-lights",
  },
  {
    id: "bike-lights",
    name: "Bike Lights",
    description: "Rechargeable and battery-powered bike lights for cycling safety",
    href: "/products/led-lights/bike-lights",
  },
];

export default async function LEDLightsPage() {
  const allProducts = await getProducts("led-lights");
  
  const subcategoriesWithCounts = subcategories.map((subcat) => ({
    ...subcat,
    count: allProducts.filter((p) => p.subcategory === subcat.id).length,
  }));

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            LED <span className="text-gradient">Lights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            High-performance LED lighting solutions for all your automotive needs
          </p>
        </div>
        <SubcategoryLinks subcategories={subcategoriesWithCounts} basePath="/products/led-lights" />
        <div className="mt-12">
          <h2 className="font-oswald text-3xl font-bold text-white mb-8">All LED Lights</h2>
          <ProductGrid category="led-lights" />
        </div>
      </div>
    </div>
  );
}

