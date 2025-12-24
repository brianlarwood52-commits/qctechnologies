// CMS Integration Layer
// This file provides a unified interface for accessing products
// Currently uses JSON file, but can be easily swapped for Sanity, Strapi, etc.

import productsData from "@/data/products.json";

// Ensure products data is available
if (!productsData || !productsData.products) {
  console.error("Products data is missing or invalid");
}

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

export async function getProducts(category?: string, subcategory?: string): Promise<Product[]> {
  // TODO: Replace with actual CMS API call
  // For Sanity:
  // const client = createClient({...});
  // return await client.fetch(`*[_type == "product"${category ? ` && category == "${category}"` : ""}${subcategory ? ` && subcategory == "${subcategory}"` : ""}]`);
  
  // For Strapi:
  // const res = await fetch(`${process.env.STRAPI_URL}/api/products${category ? `?filters[category][$eq]=${category}` : ""}${subcategory ? `&filters[subcategory][$eq]=${subcategory}` : ""}`);
  // const data = await res.json();
  // return data.data.map((item: any) => ({ ...item.attributes, id: item.id }));
  
  // Current: JSON file (for development/easy management)
  let products = productsData.products as Product[];
  
  if (category) {
    products = products.filter((p) => p.category === category);
  }
  
  if (subcategory) {
    products = products.filter((p) => p.subcategory === subcategory);
  }
  
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  // TODO: Replace with actual CMS API call
  const products = await getProducts();
  return products.find((p) => p.id === id) || null;
}

