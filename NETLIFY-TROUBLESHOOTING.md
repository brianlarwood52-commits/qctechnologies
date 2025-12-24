# Netlify Deployment Troubleshooting

## If Build Fails with Incomplete Logs

### Step 1: Verify Local Build
Run locally to ensure it works:
```bash
npm ci
npm run build
```

### Step 2: Check Netlify Build Settings
In Netlify Dashboard → Site settings → Build & deploy:

**Build settings:**
- Build command: `npm run build`
- Publish directory: (leave empty - Next.js plugin handles this)
- Node version: `20`

### Step 3: Check Environment Variables
Go to Site settings → Environment variables:
- Ensure `NODE_ENV` is set to `production` (optional, but recommended)

### Step 4: Clear Build Cache
In Netlify Dashboard:
1. Go to Site settings → Build & deploy
2. Click "Clear cache and retry deploy"

### Step 5: Check for Missing Files
Ensure these files are committed:
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `netlify.toml`
- `tsconfig.json`
- All files in `app/` directory
- All files in `components/` directory
- `data/products.json`

### Step 6: Check Build Logs
In Netlify Dashboard:
1. Go to Deploys
2. Click on the failed deploy
3. Click "Show deploy log"
4. Look for error messages (not just "}")

### Common Issues

#### Issue: "Cannot find module"
**Solution:** Ensure all dependencies are in `package.json` and run `npm ci` locally first.

#### Issue: TypeScript errors
**Solution:** Run `npm run build` locally and fix any TypeScript errors before deploying.

#### Issue: Memory errors
**Solution:** The `netlify.toml` includes `NODE_OPTIONS = "--max-old-space-size=4096"` to increase memory.

#### Issue: Next.js plugin not found
**Solution:** The plugin is auto-installed by Netlify. If it fails, you can manually add it:
```bash
npm install --save-dev @netlify/plugin-nextjs
```

#### Issue: Build timeout
**Solution:** Netlify free tier has a 15-minute build limit. If your build takes longer, consider:
- Optimizing images
- Reducing bundle size
- Using Netlify Pro (45-minute limit)

### Alternative: Manual Deploy
If automatic deploys fail, try manual deploy:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

This will give you more detailed error messages.

### Still Having Issues?
1. Copy the FULL build log from Netlify (not just "}")
2. Check if the build works locally
3. Verify all files are committed to Git
4. Try clearing Netlify's build cache

