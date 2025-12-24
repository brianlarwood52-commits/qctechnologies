# Exact URL to Build Settings

## Direct Link to Build Settings

Based on your site name, try this exact URL:

```
https://app.netlify.com/sites/qctechnologies/configuration/build
```

Or if that doesn't work:

```
https://app.netlify.com/sites/qctechnologies/settings/deploys#build-settings
```

## What You Should See

On the Build settings page, you should see:
- **Build command**: `npm run build`
- **Publish directory**: `.next` ← **DELETE THIS VALUE**
- **Node version**: `20`

## If You Still Can't Find It

The UI might have changed. Try this:

1. Click **"Site settings"** (top right of any page)
2. Look for tabs or sections at the top
3. Click **"Build & deploy"** tab
4. Look for **"Build settings"** subsection (not "Continuous deployment")
5. Or scroll down to find "Publish directory" field

## Nuclear Option: Contact Netlify Support

If the UI is completely broken, you can:
1. Go to: https://www.netlify.com/support/
2. Ask them to remove the publish directory setting via their backend
3. Mention: "The Next.js plugin needs to handle publishing automatically"

## Workaround: Try Different Plugin Configuration

If we can't remove the UI setting, we might need to configure the plugin to work WITH the `.next` directory instead of against it.

