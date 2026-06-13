# Wallet Connection

## Goal

Represent the wallet identity path needed for ENS and crypto checkout work.

## Current Prototype Behavior

- Email signup creates a demo Privy embedded wallet.
- Selecting crypto exposes a demo external wallet connection.
- Connected wallet state shows address and network.
- ENS status switches to ready once a wallet is connected.

## Later Integration

- Replace demo wallet state with Privy embedded wallet data.
- Add external wallet connection through Privy or a wallet connector.
- Use the connected wallet address as the input for ENS name resolution.
- Gate crypto payment execution behind a real connected wallet.

## Acceptance Checklist

- [x] Embedded wallet state is visible after email signup.
- [x] Crypto wallet connection state is represented.
- [x] Wallet address and network are visible.
- [x] ENS lookup readiness is tied to wallet connection.
- [ ] Replace demo connection with live wallet provider.
