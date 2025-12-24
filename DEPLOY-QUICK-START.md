# Quick Deploy to Netlify

## 🚀 Fastest Way (5 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Ready for Netlify deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Netlify
1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub and select your repository
4. Netlify will auto-detect Next.js settings
5. Click **"Deploy site"**

That's it! Your site will be live in ~2 minutes.

## 📋 What's Optimized

✅ **Performance**
- Image optimization (AVIF/WebP formats)
- Code minification
- Static asset caching (1 year)
- API route caching (1 minute)
- Compression enabled

✅ **Security**
- Security headers configured
- XSS protection
- Content type protection

✅ **SEO**
- Optimized metadata
- Fast page loads
- Mobile responsive

## 🔧 Manual Configuration (if needed)

If auto-detection doesn't work:

**Build settings:**
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `20`

**Environment variables:**
- None required (unless you add a CMS later)

## 📝 Post-Deployment

1. Test your site: `https://your-site.netlify.app`
2. Check API: `https://your-site.netlify.app/api/products`
3. Test navigation and product pages
4. Add custom domain (optional)

## 🆘 Troubleshooting

**Build fails?**
- Check Node version is 20+
- Run `npm install` locally first
- Check build logs in Netlify dashboard

**API not working?**
- Ensure `@netlify/plugin-nextjs` is installed (auto-installed)
- Check function logs in Netlify dashboard

**Need help?**
- See `NETLIFY-DEPLOY.md` for detailed guide
- Check Netlify docs: https://docs.netlify.com

