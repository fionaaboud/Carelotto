# Chainlink VRF Integration

## Goal

Use Chainlink VRF to select the winning artwork ticket from a closed CareLotto round.

## Current Prototype Behavior

- The operator closes a round after ticket sales end.
- The dashboard can request a VRF winner from the closed entry set.
- The UI displays a VRF-style request id, random word, winning ticket, payout wallet, prize amount, and claim status.
- The current demo computes a deterministic mock random word so judges can see the complete flow before testnet VRF is funded.

## Contract Prep

`CareLottoSplit` now includes:

- `vrfRequestId` on each lottery round.
- `randomWord` on each lottery round.
- `LotteryWinnerRequested(roundId, requestId)`.
- `LotteryWinnerSelected(roundId, requestId, winner, winningEntryIndex, randomWord)`.
- `recordLotteryWinner(roundId, randomWord)` for the future VRF fulfillment path.

## Chainlink Plan

Use Chainlink VRF v2.5 with the subscription method.

Why subscription:

- CareLotto runs recurring weekly rounds.
- A subscription can fund repeated randomness requests.
- The contract can request randomness when a round closes.

Final flow:

1. Buyer purchases artwork.
2. Artwork purchase becomes a ticket entry in the active round.
3. Round closes after the work has been live for the chosen period.
4. Contract requests VRF randomness for that round.
5. Chainlink fulfills the request with a random word.
6. Contract maps `randomWord % entryCount` to a winning entry.
7. Winning buyer claims the prize to the payout wallet recorded on the ticket.

## Acceptance Checklist

- [x] Dashboard shows round entries before winner selection.
- [x] Dashboard shows a VRF-style request id.
- [x] Dashboard shows random word and winning entry index.
- [x] Dashboard shows winning artwork ticket and payout wallet.
- [x] Contract has request/result events for VRF handoff.
- [x] Contract can record a random word and winner for a round.
- [ ] Import Chainlink VRF v2.5 consumer base.
- [ ] Configure Sepolia VRF coordinator, key hash, callback gas limit, and subscription id.
- [ ] Replace mock request id/random word with real VRF request and fulfillment.
