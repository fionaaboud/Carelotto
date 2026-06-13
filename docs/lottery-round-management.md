# Lottery Round Management

## Goal

Create the round structure that Chainlink VRF can use for winner selection.

## Current Prototype Behavior

- Each artwork purchase is the lottery ticket.
- Each purchase is assigned to the active lottery round.
- Each entry stores the buyer payout wallet, which should be the Privy embedded wallet or connected crypto wallet.
- One World proof can create one entry per active round.
- The impact dashboard shows active round id, entries, round pool, winner request state, and selected winner.
- A demo operator can close the round, request VRF-style winner selection, mark the prize claimed, and open the next round.
- Closing a round locks new purchases until the next round is opened.

## Contract Behavior

- `currentRoundId` tracks the active round.
- `LotteryRound` stores id, entry count, pool, open/closed state, winner request status, and winner placeholder.
- Purchases add one buyer wallet entry and the lottery share to the active round.
- Owner functions manage round lifecycle:
  - `closeCurrentLotteryRound`
  - `requestLotteryWinner`
  - `openNextLotteryRound`
- Events are emitted for round open, entry recorded, round close, and winner request.

## Chainlink Handoff

The Chainlink issue adds a VRF-style request/result path in the dashboard. The closed round id and entry list become the input set for random winner selection.

When a winner is selected, the payout should go to the wallet recorded on the winning entry. For card/email users, that is the Privy embedded wallet created during signup. For crypto users, it can be the connected wallet.

Prefer a claim-based payout in the final contract: Chainlink selects the winning entry, the contract marks the winner, and the winner claims the prize. This avoids failed push transfers blocking the round.

## Acceptance Checklist

- [x] Active round id exists in contract and UI.
- [x] Artwork purchases are assigned to a round as lottery tickets.
- [x] Entries record the buyer payout wallet.
- [x] Round pool and entry count update from purchases.
- [x] Round can be closed before winner selection.
- [x] Winner request state is represented for Chainlink handoff.
- [x] Winning ticket and payout wallet can be displayed after VRF-style fulfillment.
- [x] Next round can be opened after winner request.
- [ ] Replace demo request state with Chainlink VRF request id.
