# ENS Name Resolution

## Goal

Resolve the connected wallet identity into an ENS profile for the CareLotto demo using live mainnet ENS calls.

## Live ENS Identity

The prototype no longer hard-codes `carelotto.eth` as the buyer identity.

Connected wallets are resolved through the ENS registry and resolver contracts on Ethereum mainnet. `carelotto.eth` is only shown as the app/operator ENS identity if it resolves onchain through `VITE_OPERATOR_ENS_NAME`.

## Current Prototype Behavior

- A connected crypto wallet shows an ENS resolution card.
- The app performs reverse ENS resolution for the connected wallet address.
- Forward resolution is checked before accepting a reverse ENS name.
- ENS avatar and text records are read when they are available.
- Wallets without ENS fall back to a shortened address.
- If no wallet is connected, the UI explains that the address fallback will appear after connection.

## Environment

```bash
VITE_MAINNET_RPC_URL=https://cloudflare-eth.com
VITE_OPERATOR_ENS_NAME=carelotto.eth
VITE_DEMO_WALLET_ADDRESS=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

Use a project RPC URL for the final demo if the public fallback RPC is rate-limited.

## Acceptance Checklist

- [x] Connected wallet can resolve to a live ENS name.
- [x] ENS avatar is requested from the resolved name.
- [x] ENS text records are requested from the resolved name.
- [x] Wallet address fallback is documented.
- [x] ENS-ready state appears in checkout.
- [x] `carelotto.eth` only appears when it resolves as the app/operator identity.
