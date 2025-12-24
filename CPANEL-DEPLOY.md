# Deploying to cPanel (VentraIP)

This guide explains how to build and deploy a static version of the site to cPanel hosting.

## Building Static Export

Run the static build script:

```bash
npm run build:static
```

This will:
1. Create a static export in the `out/` folder
2. Generate all HTML, CSS, and JavaScript files
3. Include all product pages pre-rendered
4. Include PWA files (service worker, manifest)

## Uploading to cPanel

### Method 1: File Manager

1. **Log into cPanel**
2. **Open File Manager**
3. **Navigate to `public_html`** (or your domain's root directory)
4. **Upload all files** from the `out/` folder:
   - Select all files in the `out/` folder
   - Upload them to `public_html`
   - Make sure to preserve folder structure

### Method 2: FTP/SFTP

1. **Connect via FTP/SFTP** to your VentraIP hosting
2. **Navigate to `public_html`** directory
3. **Upload all contents** of the `out/` folder
4. **Ensure file permissions** are set correctly (644 for files, 755 for directories)

## Important Files

Make sure these files are uploaded:
- `index.html` (homepage)
- `_next/` folder (JavaScript and CSS)
- `products/` folder (all product pages)
- `sw.js` (service worker for PWA)
- `manifest.json` (PWA manifest)
- All images from `public/` folder

## .htaccess Configuration

If you need to handle routing (for client-side navigation), create a `.htaccess` file in `public_html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## Testing

After uploading:
1. Visit your domain
2. Check that all pages load correctly
3. Test product pages
4. Verify PWA functionality (service worker should register)

## Updating Products

Since this is a static export:
- Products are baked into the HTML at build time
- To update products, edit `data/products.json`
- Re-run `npm run build:static`
- Re-upload the `out/` folder

## Notes

- **No API routes**: Static export doesn't support API routes, so products are loaded directly from JSON
- **No server-side rendering**: All pages are pre-rendered at build time
- **PWA works**: Service worker and manifest are included in the static export
- **Images**: All images must be in the `public/` folder before building

## Troubleshooting

### 404 Errors on Product Pages
- Make sure `.htaccess` is uploaded and configured
- Check that all files in `out/` folder were uploaded

### Images Not Loading
- Verify images are in `public/` folder
- Check file paths are correct
- Ensure images were included in the build

### PWA Not Working
- Check that `sw.js` and `manifest.json` are in the root
- Verify HTTPS is enabled (required for PWA)
- Check browser console for service worker errors

