# Contact Netlify Support to Remove Publish Directory

Since the UI is broken/hard to navigate, here's what to tell Netlify support:

## Support Request Template

**Subject:** Need to remove publish directory setting for Next.js plugin

**Message:**
```
Hi Netlify Support,

I'm trying to deploy a Next.js site using @netlify/plugin-nextjs, but I'm getting 
this error:

"Error: Failed publishing static content"

The issue is that my site has a publish directory set to ".next" in the UI 
settings, which conflicts with the Next.js plugin. The plugin needs to handle 
publishing automatically.

I cannot find the "Build settings" section in the UI to remove the publish 
directory setting. The UI only shows "Repository" and "Functions region" 
sections under "Build & deploy settings", but no "Build settings" with the 
publish directory field.

Could you please remove the publish directory setting from my site's 
configuration? 

Site name: qctechnologies
Site ID: (check netlify status command)

Thank you!
```

## How to Contact

1. Go to: https://www.netlify.com/support/
2. Click "Contact support"
3. Fill out the form with the message above
4. They should respond within 24 hours

## Or: Try Netlify Community

Post in: https://answers.netlify.com/
Someone might know where the setting moved to in the new UI.

