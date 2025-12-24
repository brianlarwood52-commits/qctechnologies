# How to Find Netlify Site Settings

## Quick Path to Publish Directory Setting

### Method 1: Via Site Dashboard
1. Go to **Netlify Dashboard**: https://app.netlify.com
2. Click on **your site name** (in the list of sites)
3. Click **"Site settings"** button (top right, next to "Deploy settings")
4. In the left sidebar, click **"Build & deploy"**
5. Scroll down to **"Build settings"** section
6. Find **"Publish directory"** field
7. **Clear it** (delete the value, leave empty)
8. Click **"Save"** button at the bottom

### Method 2: Direct URL
Replace `YOUR_SITE_NAME` with your actual site name:
```
https://app.netlify.com/sites/YOUR_SITE_NAME/configuration/deploys
```

### Method 3: Alternative - Set in netlify.toml (Easier!)
Instead of using the UI, we can explicitly tell Netlify to ignore the publish directory. Let me update the config file.

