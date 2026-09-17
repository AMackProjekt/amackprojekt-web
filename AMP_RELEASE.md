# AMP production website

`main` in this repository is the source for the Azure Static Web App `AMackProjekt`
(`calm-sand-0e9f2e010.6.azurestaticapps.net`) serving mackprojekt.com and www.mackprojekt.com.

The September 2026 restoration incorporates the expanded MackProjekt Studio portfolio
and its original assets into this production source. The former separate studio
publication is not the deployment source for the custom domain.

## Release checks

```sh
npm ci
npm run build
node scripts/verify-amp.mjs
node scripts/test-cache-policy.mjs
```

Only `azure-static-web-apps-calm-sand-0e9f2e010.yml` deploys production. The other
Azure workflow is restricted to pull request previews. Production releases are
serialized and require the full static export, restored portfolio, and asset checks.

## Brand and content

- AMP is the primary studio identity: deep ink, teal, silver, and restrained typography.
- Preserve the original venture logos; do not substitute emoji or generic portraits.
- `lib/portfolio.ts` supplies the homepage and work directory.
- Books, enterprise platforms, CarePort, the studio, and brand resources have dedicated routes.
- The earlier MackChat URL redirects to current work and is excluded from search indexing.
- Contact and waitlist integrations remain on the existing API. Direct studio email is available as an alternative.

## Cache and routing safeguards

HTML, navigation payloads, API responses, and unversioned files must revalidate.
The service worker caches only `/_next/static/` assets and removes older AMP caches.
Page rewrites use exact routes, so `/partnerships/` does not intercept brand image files.
Keep these checks in place when adding pages or replacing artwork.

## Impact design update

Space Grotesk headlines and Manrope body text are self-hosted in public/fonts with their OFL licenses. The homepage includes a keyboard-accessible featured-venture selector and an explicit motion control. Reduced-motion preferences disable ambient animation and scroll reveals. Keep the original portfolio destinations and do not replace the venture artwork with placeholders.

The hero ecosystem supports drag rotation, seven venture selections, previous/next controls and direct product links. Hover or keyboard focus pauses ambient rotation. Thumbnail assets are derived from the original artwork and covered by release integrity checks.

## Interactive chapters

The homepage preserves the AMP universe and introduces distinct technology, movement, publication, and culture chapters. CaseFlow Operations uses the CF identity and role descriptions informed by the Projekt-Enterprise repository. Its generated floating-device illustration is a labeled concept visualization, with interactive Participant, Staff, and Admin overviews rather than fabricated customer data.

KingMe and QueenMe have custom procedural Three.js chess sculptures with original-art fallbacks. Motion respects reduced-motion preferences and the homepage motion control. Parallax targets are refreshed after product changes to avoid retaining detached DOM elements. The full-screen navigation and introduction use native modal dialogs, restore focus, and support Escape. The introduction combines the existing AMP highlight film with short timed explanatory captions and a readable transcript.

Verified at widths 320, 390, 768, 1024, 1440, and 1920: no horizontal overflow, working product/book/process selectors, 3D rendering, dialog keyboard behavior, video playback, valid image assets, preserved hero controls, and no browser runtime errors. Static export and cache/asset checks remain required by production CI.

## Continuous visual direction

The lower homepage now shares the enterprise scene's midnight, cyan, and glass visual language. Large pastel backgrounds are removed, chapter heights are reduced, and a continuous decorative light field connects the products. The founder, legacy, and closing CTA follow the same palette. Brand color remains in the venture artwork and sculptures.

The 3D pieces support horizontal pointer drag, left/right arrow keys, and Home/reset controls. Vertical touch scrolling remains available. Ambient motion respects reduced-motion and the existing pause control. The decorative field has no focusable elements and is hidden from assistive technology.
