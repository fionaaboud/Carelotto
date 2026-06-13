# ENS Care Profile

## Goal

Show a public profile for the buyer identity that combines ENS, wallet fallback, receipt history, and care impact.

## Current Prototype Behavior

- Uses `carelotto.eth` when the demo wallet is connected.
- Falls back to embedded wallet or connected address if ENS is not available.
- Shows receipt count, artist support, cause support, and lottery participation.
- Displays current selected artwork and social impact cause.
- Shows the latest receipt after a demo purchase.

## Later Integration

- Replace mock ENS data with live ENS name, avatar, and text records.
- Persist profile activity from real purchase receipts.
- Let users share their care profile after purchase.

## Acceptance Checklist

- [x] ENS identity appears in a dedicated care profile.
- [x] Wallet fallback profile appears before ENS resolution.
- [x] Profile summarizes care activity.
- [x] Latest receipt appears after purchase.
- [ ] Replace prototype state with live persisted profile data.
