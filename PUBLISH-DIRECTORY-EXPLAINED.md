# Publish Directory Setting for Netlify

## The Answer: **EMPTY/BLANK** (when using Next.js plugin)

When using `@netlify/plugin-nextjs`, the publish directory should be **EMPTY** or **NOT SET** in the Netlify UI.

## Why?

The Next.js plugin automatically:
- Detects your Next.js build output
- Handles routing
- Publishes the correct files
- Sets up serverless functions for API routes

If you set a publish directory manually (like `.next`), it conflicts with the plugin and causes the "Failed publishing static content" error.

## What to Set in Netlify UI

**Publish directory:** (leave this field **EMPTY** or **BLANK**)

## If You Can't Use the Plugin

If for some reason you can't use the Next.js plugin, then you would set:
- **Publish directory:** `.next`

But this means:
- API routes won't work as serverless functions
- You'd need to configure Next.js for static export
- You'd lose some Next.js features

## Current Configuration

Your `netlify.toml` is set up correctly:
- No `publish` setting in the config file
- Next.js plugin is enabled
- Plugin will handle publishing automatically

## The Problem

The issue is that somewhere in Netlify's backend, your site has `publish = ".next"` set, and the UI doesn't show where to change it.

## Solution

1. **Best:** Contact Netlify support to remove the publish directory setting
2. **Alternative:** Find "Build settings" in the UI (if it exists) and clear the publish directory field

## Summary

**For Next.js with the plugin:** Publish directory = **EMPTY/BLANK**  
**Without the plugin:** Publish directory = `.next` (but you lose features)

