# Vercel Deployment

## Goal

Deploy CareLotto over HTTPS so World ID can use the production app URL.

## Build Settings

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

These are also captured in `vercel.json`.

## Required Vercel Environment Variables

```bash
VITE_WORLD_APP_ID=app_2dd3c2c47d27834297fd642c8a553d74
VITE_WORLD_ACTION=carelotto_purchase
VITE_WORLD_RP_CONTEXT_ENDPOINT=/api/world/rp-context
VITE_WORLD_VERIFY_ENDPOINT=/api/world/verify
WORLD_RP_ID=rp_38763cbe85bab537
WORLD_RP_SIGNING_KEY=
```

Add the real `WORLD_RP_SIGNING_KEY` in Vercel. Do not commit it to Git.

## World Developer Portal

Use the Vercel production URL as the World app URL. Example:

```text
https://carelotto.vercel.app
```

If Vercel gives a different production URL, update the World Developer Portal to match that deployed HTTPS URL.

## API Routes

The deployment includes two Vercel serverless routes:

- `/api/world/rp-context`: signs the World ID request with the RP signing key.
- `/api/world/verify`: verifies the proof with the World Developer Portal API.
