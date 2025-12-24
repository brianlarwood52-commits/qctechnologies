# Where to Find Build Settings in Netlify

## The Problem
You're on the "Build & deploy settings" → "Repository" page, but the publish directory is NOT there.

## The Solution: It's in a DIFFERENT Section

The publish directory is in **"Build settings"** which is a SEPARATE section from "Build & deploy settings".

## Correct Path:

1. From the page you're on, look at the **left sidebar**
2. Scroll down in the left sidebar
3. Look for **"Build settings"** (NOT "Build & deploy settings")
4. Click on **"Build settings"**
5. You'll see fields like:
   - Build command
   - Publish directory ← **THIS IS WHERE IT IS**
   - Node version

## Alternative: Direct URL

Replace `my-technologies` with your actual site name:
```
https://app.netlify.com/sites/my-technologies/configuration/build
```

## Or: Use the Top Navigation

1. Click **"Site settings"** (top right)
2. In left sidebar, look for **"Build settings"** (separate from "Build & deploy")
3. Click it
4. Find "Publish directory" and clear it

## Visual Guide:

```
Left Sidebar:
├─ Project configuration
│  ├─ Build & deploy ← You are here (wrong place!)
│  │  ├─ Repository ← Current page
│  │  └─ Functions region
│  └─ Build settings ← GO HERE INSTEAD! (has publish directory)
```

The publish directory is in "Build settings", NOT in "Build & deploy settings"!

