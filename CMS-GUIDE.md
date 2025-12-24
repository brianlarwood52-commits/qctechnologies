# CMS Guide - Managing Products

## Overview

All products in this site can be easily managed through the CMS. The current setup uses a JSON-based CMS that can be easily upgraded to Sanity, Strapi, or any other headless CMS.

## Current Setup: JSON CMS

### Location
- **Product Data File**: `data/products.json`
- **CMS Library**: `lib/cms.ts`
- **API Route**: `app/api/products/route.ts`

### Product Structure

Each product follows this structure:

```json
{
  "id": "unique-product-id",
  "name": "Product Name",
  "description": "Product description with features and specifications",
  "category": "led-lights | tail-lights | toolboxes",
  "subcategory": "work-lights | emergency-lights | signal-lights | bike-lights | canopy | dog-boxes | mine-service | standard",
  "brand": "Brand Name (optional)",
  "image": "URL or path to product image",
  "slug": "url-friendly-product-name"
}
```

### Categories and Subcategories

#### LED Lights (`led-lights`)
- **work-lights**: Work lights for trucks and 4WDs
- **emergency-lights**: Emergency and warning lights
- **signal-lights**: Signal lights (ADR approved)
- **bike-lights**: Bike lights (rechargeable/battery)

#### Tail Lights (`tail-lights`)
- No subcategories currently

#### Toolboxes (`toolboxes`)
- **canopy**: Canopy toolboxes
- **dog-boxes**: Dog boxes
- **mine-service**: Mine service vehicle toolboxes
- **standard**: Standard toolboxes

### How to Add/Edit Products

1. **Open** `data/products.json`
2. **Add or edit** product objects in the `products` array
3. **Save** the file
4. The changes will be reflected immediately (no rebuild needed in dev mode)

### Example: Adding a New Product

```json
{
  "id": "new-product-id",
  "name": "New LED Work Light",
  "description": "High-performance LED work light with 10-30V DC, polycarbonate lens, waterproof design. 5-year warranty.",
  "category": "led-lights",
  "subcategory": "work-lights",
  "brand": "Roadvision",
  "image": "/products/new-work-light.jpg",
  "slug": "new-led-work-light"
}
```

### Image Management

- Product images should be placed in `public/products/`
- Use descriptive filenames (e.g., `rwl95-series-front.jpg`)
- Supported formats: JPG, PNG, WebP
- Recommended size: 800x800px minimum

### Upgrading to a Headless CMS

The codebase is designed to easily switch to a headless CMS:

#### Option 1: Sanity
1. Install Sanity: `npm install @sanity/client`
2. Update `lib/cms.ts` to use Sanity queries
3. Replace `getProducts()` and `getProduct()` functions

#### Option 2: Strapi
1. Install Strapi: `npm install @strapi/strapi`
2. Update `lib/cms.ts` to fetch from Strapi API
3. Configure API endpoints

#### Option 3: Contentful
1. Install Contentful: `npm install contentful`
2. Update `lib/cms.ts` to use Contentful SDK

The API route (`app/api/products/route.ts`) will continue to work the same way, so no frontend changes are needed.

## Current Products

- **LED Lights**: 15 products across 4 subcategories
- **Tail Lights**: 5 products
- **Toolboxes**: 17 products across 3 subcategories

**Total**: 37 products

## Notes

- All product data is currently stored in `data/products.json`
- The CMS abstraction layer (`lib/cms.ts`) makes it easy to switch to any CMS
- Product images can be hosted locally or on a CDN
- The site automatically generates product pages at `/products/[category]/[slug]`
- Subcategory pages are automatically created based on product data

## Support

For questions or issues with product management, refer to:
- `lib/cms.ts` - CMS integration layer
- `app/api/products/route.ts` - API endpoint
- `components/ProductGrid.tsx` - Product display component

