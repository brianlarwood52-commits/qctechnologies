// Client-side CMS helper for static export
// This loads products from a JSON file that will be included in the static build

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  image: string;
  subcategory?: string;
  slug?: string;
  specifications?: Record<string, string>;
  features?: string[];
}

let productsCache: Product[] | null = null;

export async function getProducts(category?: string, subcategory?: string): Promise<Product[]> {
  // Load products from JSON file (will be in public folder for static export)
  if (!productsCache) {
    try {
      const response = await fetch('/data/products.json');
      const data = await response.json();
      productsCache = data.products as Product[];
    } catch (error) {
      console.error('Failed to load products:', error);
      productsCache = [];
    }
  }

  let products = productsCache || [];

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (subcategory) {
    products = products.filter((p) => p.subcategory === subcategory);
  }

  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

