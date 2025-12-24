# Quick Setup Instructions

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## Adding Your First Product

### Option 1: Quick Start (JSON)

Edit `data/products.json` and add your product:

```json
{
  "products": [
    {
      "id": "my-first-product",
      "name": "My Product Name",
      "description": "Product description here",
      "category": "led-lights",
      "brand": "Brand Name",
      "image": "/products/my-product.jpg"
    }
  ]
}
```

Then add the image to `public/products/my-product.jpg`

### Option 2: Set Up CMS (Recommended for Long Term)

See `CMS_SETUP.md` for detailed instructions on setting up Sanity or Strapi CMS.

## Adding Brand Logos

1. Add brand logo images to `public/brands/`
2. Update `components/BrandPartners.tsx` with your brand information

## Customization

- **Colors**: Edit `app/globals.css`
- **Content**: Edit components in `components/` folder
- **Business Info**: Update `components/Footer.tsx` and `components/Navigation.tsx`

## Building for Production

```bash
npm run build
npm start
```

## Deploying

The site can be deployed to:
- **Vercel** (recommended for Next.js) - `vercel deploy`
- **Netlify** - Connect your Git repository
- **Any Node.js hosting** - Run `npm run build && npm start`

## Need Help?

Check `README.md` and `CMS_SETUP.md` for more detailed information.

