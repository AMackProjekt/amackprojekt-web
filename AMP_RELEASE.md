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
