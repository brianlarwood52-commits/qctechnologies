import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-oswald text-6xl md:text-7xl font-bold text-white mb-4">
          Product <span className="text-gradient">Not Found</span>
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            <span>Browse All Products</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

