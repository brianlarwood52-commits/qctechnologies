# PWA Testing Guide

## ✅ PWA is Now Configured

The PWA has been set up with:
- ✅ Service Worker (`/sw.js`)
- ✅ Manifest (`/manifest.json`)
- ✅ Proper PNG icons (192x192 and 512x512)
- ✅ PWA enabled in all environments
- ✅ Auto-registration of service worker

## How to Test

### 1. Build and Start Production Server
```bash
npm run build
npm start
```

### 2. Open in Browser
Navigate to `http://localhost:3000`

### 3. Check Service Worker
1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Click **Service Workers** in the left sidebar
4. You should see:
   - Service Worker registered at `/sw.js`
   - Status: **activated and running**

### 4. Check Manifest
1. In DevTools **Application** tab
2. Click **Manifest** in the left sidebar
3. You should see:
   - App name: "QC Technologies"
   - Icons displayed correctly
   - Theme color: #dc2626

### 5. Test Install Prompt
- **Chrome/Edge**: Look for install icon in address bar
- **Mobile**: Browser should show "Add to Home Screen" option
- **Desktop**: Install button may appear in address bar

### 6. Test Offline Mode
1. In DevTools, go to **Network** tab
2. Check **Offline** checkbox
3. Refresh the page
4. The site should still work (cached pages)

## Troubleshooting

### Service Worker Not Registering
- Make sure you're running `npm start` (production mode)
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Check console for errors

### Install Prompt Not Showing
- PWA requires HTTPS in production (localhost works for testing)
- Some browsers need user interaction before showing prompt
- Check that all PWA criteria are met (manifest, service worker, icons)

### Icons Not Loading
- Verify icons exist in `public/` folder
- Check manifest.json has correct paths
- Icons should be PNG format (192x192 and 512x512)

## Current Status

✅ PWA is fully configured and should work in production mode.
✅ Service worker will cache pages for offline use.
✅ Icons are properly sized PNG files.
✅ Manifest is correctly configured.

## Next Steps

1. **Replace Icons**: Replace `icon-192.png` and `icon-512.png` with your actual logo
2. **Test on Mobile**: Test the install prompt on mobile devices
3. **Deploy**: Deploy to production with HTTPS for full PWA functionality

