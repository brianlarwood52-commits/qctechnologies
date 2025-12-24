# Hero Background Options

The Hero component now supports three background types. You can switch between them by changing the `backgroundType` state in `components/Hero.tsx`.

## Option 1: Slideshow (Recommended for cPanel)

**Best for:** Showcasing multiple products/vehicles, professional look, easy to update

**Pros:**
- ✅ Professional appearance similar to your current Wix site
- ✅ Easy to update - just add images to `/public/hero/`
- ✅ Lightweight and fast loading
- ✅ Works great on mobile devices
- ✅ SEO friendly (images can have alt text)

**Cons:**
- ❌ Requires high-quality images
- ❌ Need to create/curate multiple images

**Setup:**
1. Create folder: `public/hero/`
2. Add 3-5 high-quality images (1920x1080 recommended):
   - `hero-1.jpg` - LED lights on trucks/vehicles
   - `hero-2.jpg` - Toolboxes on vehicles
   - `hero-3.jpg` - 4WDs with accessories
3. Change `backgroundType` to `'slideshow'` in `Hero.tsx` (line 20)

**Image Suggestions:**
- Action shots of trucks with LED lights
- Toolboxes mounted on vehicles
- 4WDs with your products
- Professional product photography

---

## Option 2: Video Background

**Best for:** Dynamic, modern feel, showcasing products in action

**Pros:**
- ✅ Very modern and engaging
- ✅ Can show products in action
- ✅ Creates strong visual impact
- ✅ Professional video can be very impressive

**Cons:**
- ❌ Large file size (affects loading speed)
- ❌ Requires professional video production
- ❌ May not work well on slower connections
- ❌ More complex to create/update

**Setup:**
1. Create folder: `public/hero/`
2. Add video file: `hero-video.mp4` (keep under 10MB if possible)
3. Change `backgroundType` to `'video'` in `Hero.tsx` (line 20)

**Video Tips:**
- Keep duration: 15-30 seconds (loops automatically)
- Resolution: 1920x1080 (Full HD)
- Format: MP4 (H.264 codec)
- File size: Compress to under 10MB for web
- Content: Showcase LED lights/toolboxes in action

---

## Option 3: Animated Background (Current Default)

**Best for:** Fast loading, no assets needed, modern minimalist look

**Pros:**
- ✅ No additional files needed
- ✅ Fastest loading time
- ✅ Works on all devices
- ✅ Modern, minimalist aesthetic
- ✅ Already implemented and working

**Cons:**
- ❌ Less visual impact than slideshow/video
- ❌ Doesn't showcase actual products

**Current Status:** ✅ Active (no changes needed)

---

## Recommendation

**For your QC Technologies site, I recommend the SLIDESHOW option:**

1. **Matches your current Wix site** - Your live site uses a slideshow/carousel
2. **Professional appearance** - Shows actual products and vehicles
3. **Easy to maintain** - Just swap images when you get new product photos
4. **Good performance** - Images load quickly, especially with Next.js optimization
5. **Mobile friendly** - Works great on all devices

### Quick Start with Slideshow:

1. **Get images** from your current Wix site or take new photos
2. **Create the folder:**
   ```bash
   mkdir public/hero
   ```
3. **Add 3-5 images** (name them `hero-1.jpg`, `hero-2.jpg`, etc.)
4. **Update Hero.tsx** line 20:
   ```typescript
   const [backgroundType, setBackgroundType] = useState<BackgroundType>('slideshow');
   ```

### Image Requirements:
- **Format:** JPG or WebP (WebP is smaller)
- **Size:** 1920x1080 pixels (16:9 aspect ratio)
- **File size:** Under 500KB each (compress with tools like TinyPNG)
- **Content:** High-quality photos of trucks/vehicles with your products

---

## Testing

You can test all three options by changing the `backgroundType` state. The component will automatically fall back to the animated background if images/video fail to load.

