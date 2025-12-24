# Netlify Deployment Guide

## Prerequisites

1. **GitHub/GitLab/Bitbucket account** (for automatic deployments)
2. **Netlify account** (free at [netlify.com](https://netlify.com))
3. **Node.js 20+** installed locally

## Quick Deploy (Recommended)

### Option 1: Deploy via Netlify UI (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider and select your repository

3. **Configure Build Settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (or leave empty for Next.js)
   - **Node version**: `20` (or latest LTS)

4. **Environment Variables** (if needed)
   - Go to Site settings → Environment variables
   - Add any required variables (e.g., `NODE_ENV=production`)

5. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy your site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize site**
   ```bash
   netlify init
   ```
   - Follow the prompts to connect to an existing site or create a new one

4. **Build and deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Configuration Files

The project includes:
- **`netlify.toml`** - Netlify configuration with build settings, redirects, and headers
- **`next.config.ts`** - Optimized Next.js configuration

## Important Notes

### API Routes
- API routes in `app/api/` will automatically work as Netlify serverless functions
- The `/api/products` route will be available at `https://your-site.netlify.app/api/products`

### Static Assets
- Images in `public/` folder are automatically served
- Product images should be in `public/products/`
- Brand logos should be in `public/brands/`

### Environment Variables
If you need environment variables:
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add variables like:
   - `NODE_ENV=production`
   - Any API keys or secrets

### Custom Domain
1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify API routes work (`/api/products`)
- [ ] Check product images load
- [ ] Test navigation menu
- [ ] Verify mobile responsiveness
- [ ] Test PWA installation (if applicable)
- [ ] Check contact form (if applicable)

## Continuous Deployment

Once connected to Git:
- **Automatic deploys** on every push to main branch
- **Deploy previews** for pull requests
- **Rollback** to previous deployments if needed

## Performance Optimization

The site is optimized with:
- ✅ Image optimization (AVIF/WebP)
- ✅ Code minification
- ✅ Static asset caching
- ✅ API route caching
- ✅ Compression enabled

## Troubleshooting

### Build Fails
- Check Node version (should be 20+)
- Verify all dependencies are in `package.json`
- Check build logs in Netlify dashboard

### API Routes Not Working
- Ensure `netlify.toml` includes `@netlify/plugin-nextjs`
- Check function logs in Netlify dashboard
- Verify API route paths are correct

### Images Not Loading
- Ensure images are in `public/` folder
- Check image paths in product data
- Verify file extensions are correct

### 404 Errors
- Check `netlify.toml` redirect rules
- Verify Next.js routing configuration
- Check build output for missing pages

## Support

For Netlify-specific issues:
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Community](https://answers.netlify.com)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/nextjs/)

