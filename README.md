# LUMERIS Reel Maker

Source repository for the LUMERIS Reel Maker currently deployed on Vercel.

## Deployment

- Production URL: https://lumeris-reel-maker.vercel.app
- Vercel project: `lumeris-reel-maker`
- Production source recovery: in progress

## Source status

This repository was initialized from the production deployment source. The following files have been recovered so far:

- `src/api/chk.js`
- `src/api/page.js`
- `src/api/proxy.js`
- `src/api/sounds.js`
- `src/package.json`
- `src/vercel.json`

The remaining application files (including the main HTML interface, Reel/Posts scripts, and related API handlers) still need complete recovery and verification before this repository should be treated as the authoritative build source.

## Safety

Do not commit API keys, tokens, or other secrets. Configure required credentials as Vercel environment variables.
