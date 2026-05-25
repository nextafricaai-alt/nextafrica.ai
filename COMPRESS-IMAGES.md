# Image Compression — Required for SEO

The site currently weighs ~120 MB to fully load because most images are 4–12 MB each. **An optimised web image is 100–300 KB.** Compress the list below and you'll go from Lighthouse score ~40 to ~85 overnight.

## Tool — Squoosh (free, browser-based, no upload)

1. Go to **https://squoosh.app**
2. Drag the original image from `assets/` into the page.
3. **Right panel settings:**
   - Format: **WebP** (or MozJPEG if you need wide compatibility)
   - Quality: **75–80** (rarely visible degradation)
   - Resize: if the original is >2000px wide, resize to 1920px
4. Click **Download** (bottom-right).
5. Replace the original in `assets/` with the new file. Keep the same filename so HTML references still work.
6. After compressing all of them: `git add . && git commit -m "Compress assets" && git push`.

## Priority List (heaviest first — fix these 12 and your site is 80% faster)

| File | Current | Target |
|---|---|---|
| healthcare-brain-scan.jpg | 12.2 MB | 150 KB |
| jessy-trainer-photo.jpg | 9.6 MB | 200 KB (resize 800px wide for headshot) |
| hudson-founder-photo.jpg | 9.5 MB | 200 KB (resize 800px wide for headshot) |
| corporate-collaboration.jpg | 8.8 MB | 200 KB |
| corporations-tablet.jpg | 8.8 MB | 200 KB |
| patrick-developer-photo.jpg | 8.6 MB | 200 KB (resize 800px wide for headshot) |
| school-classroom-teacher.jpg | 7.9 MB | 200 KB |
| ai-training-education.jpg | 7.7 MB | 200 KB |
| school-district-collaboration.jpg | 7.1 MB | 200 KB |
| church-building.jpg | 7.2 MB | 200 KB |
| churches-teleconference.jpg | 7.1 MB | 200 KB |
| ngo-team-data-analysis.jpg | 6.5 MB | 200 KB |
| healthcare-digital-health.jpg | 4.4 MB | 200 KB |
| school-dashboard-team.jpg | 2.4 MB | 200 KB |
| nextafrica-lms-hero.png | 1.8 MB | 250 KB |

## After Compressing — Verify

1. Open **https://pagespeed.web.dev/**
2. Enter your live URL (https://nextafrica.ai or wherever the site is live)
3. Run the test on both Mobile + Desktop
4. Compare the score before vs after. Target: 85+ on both.

## Bonus — Create a Proper Social Sharing Image

For Open Graph (the preview when someone shares your link on WhatsApp/LinkedIn), create a single **1200 × 630 px** image:
- Brand name "NEXT" prominently
- A short tag like "Africa's AI Transformation Company"
- Save as `og-image.png` in `assets/`
- Then update the `OG_IMAGE` constant in the HTML files to point at it
