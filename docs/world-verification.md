# World Verification Integration

## Goal

Gate CareLotto participation with proof-of-human before a buyer can complete a receipt purchase.

## Current Prototype Behavior

- Email signup enables the World ID verification step.
- The buyer must complete a World ID proof request before the pay button unlocks.
- The same proof can only be used for one receipt entry in the current demo round.
- The receipt records whether World ID proof was present.
- The ENS care profile shows whether the current participant is verified.

## SDK Plan

Use World ID through IDKit:

```bash
npm install @worldcoin/idkit
```

Expected environment values:

```bash
VITE_WORLD_APP_ID=
VITE_WORLD_ACTION=carelotto_purchase
VITE_WORLD_RP_CONTEXT_ENDPOINT=/api/world/rp-context
VITE_WORLD_VERIFY_ENDPOINT=/api/world/verify
WORLD_RP_ID=
WORLD_RP_SIGNING_KEY=
```

For local testing without Vercel, keep the local endpoint values in `.env` and run the verification server in a second terminal:

```bash
npm run world:dev-server
```

For Vercel, use the built-in API routes:

- `/api/world/rp-context`
- `/api/world/verify`

Set `WORLD_RP_ID` and `WORLD_RP_SIGNING_KEY` as Vercel environment variables. Do not expose `WORLD_RP_SIGNING_KEY` in the frontend or commit it to Git.

## Prize Requirement Note

For the World ID track, proof validation should not remain client-only. The app now expects backend verification through `VITE_WORLD_VERIFY_ENDPOINT`. The final version needs validation in either:

- a web backend, or
- a smart contract verifier.

## Why CareLotto Needs It

The lottery pool and care receipt mechanics break without human verification because one person or bot could farm entries. World ID makes the product one-human-one-participation instead of one-wallet-one-entry.

## Acceptance Checklist

- [x] World verification is visible in checkout.
- [x] Purchase is gated until proof-of-human is complete.
- [x] Repeat entries with the same proof are blocked in the demo flow.
- [x] Receipt/profile show World verification status.
- [x] IDKit package is installed.
- [x] Checkout opens a real IDKit proof request when World credentials are configured.
- [x] Backend RP context and verify endpoints are documented.
- [x] Local World verification server script is available.
- [x] Vercel API routes are available for production verification.
- [ ] Add real World Developer Portal values in Vercel.
