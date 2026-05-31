# Tip Portal

Static worker and management portal for Tip venue operations.

## Pages

- `index.html` - private internal entry point with worker/manager routing.
- `worker.html` - downloadable worker dashboard for balances, QR assets, payouts, and statements.
- `manager.html` - management console for tipping pools, staff overview, analytics, and exports.

Customer tipping and payment pages are intentionally not included in this app build.

## Downloadable app support

The portal includes a web app manifest, app icon, and service worker so it can be installed from supported mobile and desktop browsers when served over HTTPS or localhost.
