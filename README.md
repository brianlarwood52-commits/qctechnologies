# QC Technologies Website

A modern, standout brochure website for QC Technologies - Automotive LED Lights & Toolboxes.

## Features

- 🎨 **Custom, Standout Design** - No default templates, completely custom-built
- 🚀 **Fast & Modern** - Built with Next.js 14, React 19, and Tailwind CSS
- 🎯 **Easy CMS Integration** - Ready for headless CMS (Sanity, Strapi, etc.)
- 📦 **Product Management** - Easy product showcase system
- ✨ **Smooth Animations** - Framer Motion for engaging interactions
- 📱 **Fully Responsive** - Looks great on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Product Management (CMS)

**All products can be easily changed through the CMS!**

The site uses a JSON-based CMS that can be upgraded to Sanity, Strapi, or any headless CMS. See [CMS-GUIDE.md](./CMS-GUIDE.md) for detailed instructions on managing products.

### Quick Start - Managing Products

1. **Edit Products**: Open `data/products.json` and modify the products array
2. **Add Products**: Add new product objects following the existing structure
3. **Change Images**: Place images in `public/products/` and update the `image` field
4. **Categories**: Use `category` and `subcategory` fields to organize products

**Current Products**: 37 products across LED Lights, Tail Lights, and Toolboxes

## CMS Setup

The site is designed to work with any headless CMS. Here are recommended options:

### Option 1: Sanity (Recommended - Easiest to Use)

Sanity has the most user-friendly admin interface:

1. **Create Sanity Project:**
   ```bash
   npm install -g @sanity/cli
   sanity init
   ```

2. **Install Sanity in this project:**
   ```bash
   npm install @sanity/client @sanity/image-url
   ```

3. **Create Product Schema** in Sanity Studio:
   - Product name
   - Description
   - Category
   - Brand
   - Image
   - Specifications (optional)

4. **Update `lib/cms.ts`** with your Sanity project ID and dataset

5. **Update `app/api/products/route.ts`** to fetch from Sanity

### Option 2: Strapi (Self-Hosted)

1. **Create Strapi project** (separate directory):
   ```bash
   npx create-strapi-app@latest qc-cms --quickstart
   ```

2. **Create Product content type** in Strapi admin:
   - Text: name
   - Textarea: description
   - Text: category
   - Text: brand (optional)
   - Media: image
   - JSON: specifications (optional)

3. **Update environment variables:**
   ```env
   STRAPI_URL=http://localhost:1337
   ```

4. **Update `lib/cms.ts`** to fetch from Strapi API

### Option 3: Simple JSON (Current - For Quick Start)

Products are stored in `data/products.json`. You can edit this file directly or create a simple admin interface later.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Navigation.tsx    # Navigation bar
│   ├── Footer.tsx        # Footer
│   ├── ProductGrid.tsx   # Product listing
│   └── ...
├── data/                  # JSON data (temporary)
│   └── products.json     # Product data
├── lib/                   # Utilities
│   └── cms.ts            # CMS integration layer
└── public/               # Static assets
    └── ...
```

## Adding Products

### Via CMS (Recommended)

Once CMS is set up, products can be added through the CMS admin interface.

### Via JSON (Temporary)

Edit `data/products.json`:

```json
{
  "products": [
    {
      "id": "unique-id",
      "name": "Product Name",
      "description": "Product description",
      "category": "led-lights", // or "toolboxes" or "tail-lights"
      "brand": "Brand Name",
      "image": "/products/image.jpg"
    }
  ]
}
```

## Customization

### Colors

Edit `app/globals.css` to change the color scheme. The site uses:
- Primary: Red (#dc2626)
- Background: Dark gray (#0a0a0a)
- Accent: Orange/Yellow gradients

### Fonts

Fonts are configured in `app/layout.tsx`:
- Headings: Oswald (bold, modern)
- Body: Inter (clean, readable)

## Building for Production

```bash
npm run build
npm start
```


## Future Enhancements

- [ ] Online store integration
- [ ] Product search and filtering
- [ ] Product comparison
- [ ] Customer reviews
- [ ] Newsletter signup
- [ ] Live chat

## Support

For questions or issues, contact QC Technologies at sales@qctechnologies.com.au

## License

© 2024 QC Technologies. All rights reserved.
