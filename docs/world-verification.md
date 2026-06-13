# World Verification Integration

## Goal

Gate CareLotto participation with proof-of-human before a buyer can complete a receipt purchase.

## Current Prototype Behavior

- Email signup enables the World ID verification step.
- The buyer must complete the demo World ID step before the pay button unlocks.
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
```

## Prize Requirement Note

For the World ID track, proof validation should not remain client-only. The final version needs validation in either:

- a web backend, or
- a smart contract verifier.

## Why CareLotto Needs It

The lottery pool and care receipt mechanics break without human verification because one person or bot could farm entries. World ID makes the product one-human-one-participation instead of one-wallet-one-entry.

## Acceptance Checklist

- [x] World verification is visible in checkout.
- [x] Purchase is gated until proof-of-human is complete.
- [x] Repeat entries with the same proof are blocked in the demo flow.
- [x] Receipt/profile show World verification status.
- [x] SDK handoff is documented.
- [ ] Replace demo proof with IDKit.
- [ ] Add backend or smart contract proof validation.
