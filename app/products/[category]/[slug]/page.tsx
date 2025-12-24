import { getProduct, getProducts } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, MapPin } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    category: product.category,
    slug: product.slug || product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const products = await getProducts();
  const product = products.find(
    (p) => (p.slug === slug || p.id === slug) && p.category === category
  );

  if (!product) {
    return {
      title: "Product Not Found | QC Technologies",
    };
  }

  return {
    title: `${product.name} | QC Technologies`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const products = await getProducts();
  const product = products.find(
    (p) => (p.slug === slug || p.id === slug) && p.category === category
  );

  if (!product) {
    notFound();
  }

  const categoryName = product.category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const categoryPath = `/products/${product.category}`;

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={categoryPath}
          className="inline-flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to {categoryName}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
            <Image
              src={product.image || "/products/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              sizes="(max-width: 1024px) 100vw, 50vw"
              unoptimized={product.image?.startsWith("http")}
            />
            {product.brand && (
              <div className="absolute top-4 right-4 bg-red-600/90 px-4 py-2 rounded-lg text-sm font-semibold text-white">
                {product.brand}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-oswald text-4xl md:text-5xl font-bold text-white mb-4">
                {product.name}
              </h1>
              {product.subcategory && (
                <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4">
                  {product.subcategory.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              )}
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            </div>

            {/* Contact Section */}
            <div className="pt-8 border-t border-gray-800 space-y-4">
              <p className="text-gray-400">Interested in this product? Contact us for more information:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:0423102488"
                  className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  <Phone size={20} />
                  <span>0423 102 488</span>
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-center space-x-2 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg transition-colors font-semibold"
                >
                  <MapPin size={20} />
                  <span>Visit Us</span>
                </a>
              </div>
              <p className="text-sm text-gray-500">
                Unit 2, 3 Wicks Street, Bayswater WA 6053
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="font-oswald text-3xl font-bold text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.category}/${related.slug || related.id}`}
                  className="block bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all group"
                >
                  <div className="relative h-48 bg-gray-900">
                    <Image
                      src={related.image || "/products/placeholder.jpg"}
                      alt={related.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      unoptimized={related.image?.startsWith("http")}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-oswald text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors line-clamp-2">
                      {related.name}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

