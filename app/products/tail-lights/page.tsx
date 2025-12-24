import ProductGrid from "@/components/ProductGrid";

export const metadata = {
  title: "LED Tail Lights | QC Technologies",
  description: "Premium Helled LED tail lights for enhanced visibility and style",
};

export default function TailLightsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-oswald text-5xl md:text-6xl font-bold text-white mb-4">
            LED Tail <span className="text-gradient">Lights</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Premium Helled LED tail lights for enhanced visibility and modern style
          </p>
        </div>
        <ProductGrid category="tail-lights" />
      </div>
    </div>
  );
}

