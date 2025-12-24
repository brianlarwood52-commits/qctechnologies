# Deploy to Netlify via CLI (Skip the UI!)

## Why Use CLI?
- ✅ No need to find settings in confusing UI
- ✅ Uses `netlify.toml` automatically
- ✅ Faster and more reliable
- ✅ Better error messages

## Quick Deploy

```bash
# Make sure you're logged in
netlify login

# Deploy to production
netlify deploy --prod
```

That's it! The CLI will:
- Use your `netlify.toml` settings
- Ignore any UI settings
- Give you better error messages
- Show you the deploy URL

## First Time Setup

If you haven't connected this folder to a Netlify site yet:

```bash
# Initialize (connects folder to Netlify site)
netlify init

# Then deploy
netlify deploy --prod
```

## Open Settings (If You Really Need To)

```bash
# Opens the admin page in your browser
netlify open:admin

# Then navigate to: Site settings → Build & deploy → Build settings
```

## Check Deploy Status

```bash
# See recent deploys
netlify status

# Open the site
netlify open:site
```

## Pro Tip
Just use `netlify deploy --prod` - it's way easier than the UI!

