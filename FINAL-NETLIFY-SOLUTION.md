# Final Solution: Contact Netlify Support

Since the UI is broken and we can't find "Build settings", here's the definitive solution:

## The Real Problem
Netlify's UI has a publish directory set to `.next` somewhere in their backend, but the UI doesn't show where to change it. This conflicts with the Next.js plugin.

## Solution: Contact Netlify Support

**Go to:** https://www.netlify.com/support/

**Send this message:**

```
Subject: Need to remove publish directory setting - UI not showing Build settings

Hi Netlify Support,

I'm deploying a Next.js site (qctechnologies) using @netlify/plugin-nextjs, 
but getting this error:

"Error: Failed publishing static content"

The issue is that my site has a publish directory set to ".next" in the 
backend settings, which conflicts with the Next.js plugin. The plugin needs 
to handle publishing automatically.

I cannot find the "Build settings" section in the UI to remove this setting. 
I've looked in:
- Site settings → Build & deploy → (only shows Repository, Functions region)
- Configuration → Build & deploy → (only shows Continuous deployment, etc.)

The "Build settings" section with the publish directory field is not visible 
anywhere in the UI.

Could you please remove the publish directory setting from my site's 
configuration via your backend?

Site name: qctechnologies
Site URL: https://app.netlify.com/sites/qctechnologies

Thank you!
```

## Alternative: Try This First

Before contacting support, try clicking on **"Continuous deployment"** in the left sidebar under "Build & deploy". Sometimes the build settings are nested there.

Or try this direct URL (replace with your actual site ID if different):
```
https://app.netlify.com/sites/qctechnologies/configuration/deploys#build
```

## Why This Is The Best Solution

1. Netlify support can fix it in 5 minutes
2. The UI is clearly broken/hidden
3. No more frustration trying to find settings
4. They'll know exactly where the setting is in their backend

