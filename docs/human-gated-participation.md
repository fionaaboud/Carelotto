# Human-Gated Participation

## Goal

Make CareLotto participation depend on proof-of-human so the lottery pool cannot be farmed by duplicate wallets or automated sessions.

## Current Prototype Behavior

- Email signup creates the buyer session.
- World ID proof is required before payment unlocks.
- One proof can mint one receipt entry in the current demo round.
- The pay button locks after the proof has already been used.
- Receipt and profile surfaces show the proof status.
- Wallet and ENS identity remain helpful profile context, but they do not replace proof-of-human.

## Why This Matters

CareLotto combines art receipts, social impact funding, and a lottery pool. The product breaks if one participant can create many wallets and farm entries. The gate makes participation human-centered rather than wallet-centered.

## Final Integration Notes

- Use World ID IDKit for proof-of-human.
- Validate the proof in a backend or smart contract before recording participation.
- Store a nullifier or proof identifier per round to prevent duplicate participation.
- Keep the fallback UI clear when a user has not completed verification.

## Acceptance Checklist

- [x] Checkout visibly explains human-gated participation.
- [x] Payment is disabled until signup and World proof are complete.
- [x] One proof maps to one receipt entry in the demo round.
- [x] Repeat purchase attempts with the same proof are blocked.
- [x] Receipt and profile show World proof status.
- [x] Replace demo proof click with live IDKit request flow.
- [x] Validate proof through a backend endpoint before unlocking payment.
- [ ] Add real World Developer Portal credentials.
- [ ] Move verification endpoint to production infrastructure or onchain verification.
