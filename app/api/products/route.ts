import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { join } from "path";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand?: string;
  image: string;
  subcategory?: string;
  slug?: string;
}

// Cache products in memory to avoid reading file on every request
let productsCache: Product[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 60000; // 1 minute cache

async function loadProducts(): Promise<Product[]> {
  const now = Date.now();
  
  // Return cached products if still valid
  if (productsCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return productsCache;
  }
  
  // Read from file
  const filePath = join(process.cwd(), "data", "products.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  
  const products: Product[] = data.products || [];
  productsCache = products;
  cacheTimestamp = now;
  
  return products;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const subcategory = searchParams.get("subcategory") || undefined;

    // Load products (from cache if available)
    let products = await loadProducts();

    // Apply filters
    if (category) {
      products = products.filter((p) => p.category === category);
      console.log("[API] Filtered by category:", category, "-", products.length, "products");
    }
    if (subcategory) {
      products = products.filter((p) => p.subcategory === subcategory);
      console.log("[API] Filtered by subcategory:", subcategory, "-", products.length, "products");
    }

    return NextResponse.json({
      products,
      category: category || "all",
      subcategory: subcategory || "all",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error("[API] Error - Message:", errorMessage);
    console.error("[API] Error - Stack:", errorStack);
    
    // Return error details in response for debugging
    return NextResponse.json(
      { 
        products: [], 
        error: "Failed to fetch products",
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? errorStack : undefined
      },
      { status: 500 }
    );
  }
}

