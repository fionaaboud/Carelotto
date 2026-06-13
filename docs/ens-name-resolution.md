# ENS Name Resolution

## Goal

Resolve the connected wallet identity into an ENS profile for the CareLotto demo.

## Demo ENS Identity

The prototype uses `carelotto.eth` as the demo ENS name once a wallet is connected.

This is mock-first for the hackathon demo. It does not claim the public ENS name currently resolves onchain.

## Current Prototype Behavior

- A connected crypto wallet shows an ENS resolution card.
- `carelotto.eth` appears as the resolved identity.
- The connected wallet address remains visible as the fallback source.
- If no wallet is connected, the UI explains that it will fall back to a shortened address.

## Later Integration

- Replace the mock resolver with live ENS lookup.
- Resolve name, avatar, and text records from the connected wallet address.
- Keep wallet-address fallback for users without ENS.

## Acceptance Checklist

- [x] Connected wallet can resolve to a visible ENS name.
- [x] `carelotto.eth` appears in the demo UI.
- [x] Wallet address fallback is documented.
- [x] ENS-ready state appears in checkout.
- [ ] Replace mock resolver with live ENS provider lookup.
