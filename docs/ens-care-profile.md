# ENS Care Profile

## Goal

Show a public profile for the buyer identity that combines ENS, wallet fallback, receipt history, and care impact.

## Current Prototype Behavior

- Resolves the connected wallet through live ENS reverse lookup.
- Verifies the reverse ENS name with forward resolution before displaying it.
- Falls back to embedded wallet or shortened connected address if ENS is not available.
- Displays ENS avatar when the `avatar` text record resolves to an image URL.
- Reads ENS text records for profile metadata when they are available.
- Shows receipt count, artist support, cause support, and lottery participation.
- Displays current selected artwork and social impact cause.
- Shows the latest receipt after a demo purchase.

## Later Integration

- Persist profile activity from real purchase receipts.
- Let users share their care profile after purchase.
- Add cause-owned ENS names or subnames for public impact organizations.

## Acceptance Checklist

- [x] ENS identity appears in a dedicated care profile.
- [x] Wallet fallback profile appears before ENS resolution.
- [x] Profile summarizes care activity.
- [x] Latest receipt appears after purchase.
- [x] Live ENS name, avatar, and text records are requested.
- [ ] Replace prototype receipt state with live persisted profile data.
