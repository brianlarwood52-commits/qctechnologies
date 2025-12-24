# Fix for "Failed publishing static content" Error

## The Problem
The Netlify UI has a publish directory set to `.next`, which conflicts with the Next.js plugin. The plugin needs to handle publishing itself.

## Solution

### Step 1: Remove Publish Directory in Netlify UI
1. Go to **Netlify Dashboard** → Your Site
2. Click **Site settings** → **Build & deploy**
3. Scroll to **Build settings**
4. Find **Publish directory** field
5. **Clear/Delete** the value (leave it empty)
6. Click **Save**

### Step 2: Verify netlify.toml
The `netlify.toml` file should NOT have a `publish` setting. It should look like:

```toml
[build]
  command = "npm run build"
  # Next.js plugin will handle publish directory automatically
```

### Step 3: Redeploy
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. Or push a new commit to trigger automatic deploy

## Why This Happens
The `@netlify/plugin-nextjs` plugin automatically:
- Detects the Next.js build output
- Handles routing and serverless functions
- Publishes the correct files

When you manually set a publish directory, it conflicts with the plugin's automatic detection.

## Alternative: If You Must Set Publish Directory
If Netlify requires a publish directory, you can try:
```toml
[build]
  command = "npm run build"
  publish = ".next"
```

But the plugin should work better without it. The recommended approach is to let the plugin handle everything automatically.

