# CMS Setup Guide for QC Technologies

This guide will help you set up a user-friendly CMS so the business owner can easily manage products.

## Recommended: Sanity CMS (Easiest to Use)

Sanity has the most intuitive admin interface and is perfect for non-technical users.

### Step 1: Create Sanity Account & Project

1. Go to [sanity.io](https://www.sanity.io) and create a free account
2. Create a new project called "QC Technologies"
3. Note your Project ID and Dataset name (usually "production")

### Step 2: Install Sanity in This Project

```bash
npm install @sanity/client @sanity/image-url
```

### Step 3: Create Product Schema

Create a file `sanity/schemas/product.ts`:

```typescript
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'LED Lights', value: 'led-lights'},
          {title: 'Toolboxes', value: 'toolboxes'},
          {title: 'Tail Lights', value: 'tail-lights'},
        ],
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      options: {
        list: [
          {title: 'Work Lights', value: 'work-lights'},
          {title: 'Emergency Lights', value: 'emergency-lights'},
          {title: 'Signal Lights', value: 'signal-lights'},
          {title: 'Bike Lights', value: 'bike-lights'},
        ],
      },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [{type: 'object', fields: [
        {name: 'key', type: 'string'},
        {name: 'value', type: 'string'}
      ]}],
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'category',
    },
  },
}
```

### Step 4: Update Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

### Step 5: Update CMS Integration

Update `lib/cms.ts`:

```typescript
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = `*[_type == "product"${category ? ` && category == "${category}"` : ""}] | order(_createdAt desc)`;
  const products = await client.fetch(query);
  
  return products.map((product: any) => ({
    id: product.slug.current,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    image: urlFor(product.image).width(800).url(),
    subcategory: product.subcategory,
    specifications: product.specifications,
    features: product.features,
  }));
}
```

### Step 6: Access Sanity Studio

The business owner can access the admin panel at:
- Development: `http://localhost:3333` (if running Sanity Studio locally)
- Production: `https://your-project.sanity.studio`

## Alternative: Strapi CMS

If you prefer self-hosted:

1. **Create Strapi project** (in separate directory):
   ```bash
   npx create-strapi-app@latest qc-cms --quickstart
   ```

2. **Create Product content type** in Strapi admin panel:
   - Text: `name`
   - Rich Text: `description`
   - Enumeration: `category` (led-lights, toolboxes, tail-lights)
   - Text: `brand` (optional)
   - Media: `image`
   - JSON: `specifications` (optional)

3. **Set permissions** - Make sure "Public" role can read products

4. **Update environment variables**:
   ```env
   STRAPI_URL=http://localhost:1337
   ```

5. **Update `lib/cms.ts`** to fetch from Strapi API

## Simple JSON Option (Quick Start)

For immediate use, products can be managed in `data/products.json`. This is fine for small catalogs but not ideal for non-technical users.

## Training the Business Owner

Once CMS is set up:

1. Show them how to log in to the admin panel
2. Demonstrate adding a new product:
   - Upload image
   - Fill in name, description, category
   - Add brand if applicable
3. Show how to edit/delete products
4. Explain image requirements (recommended: 800x800px, web-optimized)

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- Strapi Docs: https://docs.strapi.io
- Contact developer for setup assistance

