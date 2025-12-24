# Quick Fix: Remove Publish Directory Without UI

## The Problem
Netlify UI is hard to navigate, and you can't find where to remove the publish directory.

## Solution: Force it in netlify.toml

The `netlify.toml` file I just updated will override any UI settings. But if that doesn't work, here's the exact path:

## Exact Steps to Find It

1. **Go to**: https://app.netlify.com
2. **Click your site** (the site name, not "Deploys")
3. **Look for**: A button that says **"Site settings"** or **"Configuration"** (usually top right)
4. **Click**: **"Build & deploy"** in the left menu
5. **Scroll down** to see "Build settings"
6. **Find**: "Publish directory" field
7. **Delete** the value (make it empty)
8. **Save**

## Visual Guide
```
Netlify Dashboard
  └─ Your Site Name (click this)
      └─ Site settings (button, top right)
          └─ Build & deploy (left sidebar)
              └─ Build settings (section)
                  └─ Publish directory (field - DELETE THIS)
```

## Alternative: Use Netlify CLI
If the UI is too frustrating, use the command line:

```bash
# Install Netlify CLI (if not already)
npm install -g netlify-cli

# Login
netlify login

# Open your site settings in browser
netlify open:admin

# This opens the settings page directly
```

## Or: Just Deploy via CLI
Skip the UI entirely:

```bash
netlify deploy --prod
```

The CLI will use `netlify.toml` settings and ignore UI settings.

