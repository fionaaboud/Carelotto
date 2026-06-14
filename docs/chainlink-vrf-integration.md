# Chainlink VRF Integration

## Goal

Use Chainlink VRF to select the winning artwork ticket from a closed CareLotto round.

## Current App Behavior

- The operator closes a round after ticket sales end.
- If `VITE_CARELOTTO_CONTRACT_ADDRESS` is set, the dashboard sends a wallet transaction to the deployed contract's `requestLotteryWinner()` function.
- If no contract address is configured, the dashboard keeps a local demo fallback so judges can still see the full lottery experience.
- The UI displays request state, random word, winning ticket, payout wallet, prize amount, and claim status.

## Contract Integration

`CareLottoSplit` imports Chainlink VRF v2.5:

- `VRFConsumerBaseV2Plus`
- `VRFV2PlusClient`

The contract stores:

- Per-round entries.
- Round pool.
- Round open/closed state.
- VRF request id.
- VRF random word.
- Winner address.
- Prize claim state.

Key events:

- `LotteryWinnerRequested(roundId, requestId)`.
- `LotteryWinnerSelected(roundId, requestId, winner, winningEntryIndex, randomWord)`.
- `LotteryPrizeWithdrawn(roundId, winner, amount)`.

## Sepolia VRF Settings

Use Chainlink VRF v2.5 with the subscription method on Sepolia.

- VRF Coordinator: `0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B`
- Key Hash: `0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae`
- Minimum confirmations: `3`
- Random words: `1`
- Suggested callback gas limit: `200000`

## Final Flow

1. Buyer purchases artwork.
2. Artwork purchase becomes a ticket entry in the active round.
3. Round closes after the work has been live for the chosen period.
4. Operator calls `requestLotteryWinner()`.
5. Contract requests VRF randomness for that round.
6. Chainlink calls `fulfillRandomWords()` with a random word.
7. Contract maps `randomWord % entryCount` to a winning entry.
8. Winning buyer claims the prize to the payout wallet recorded on the ticket.

## Setup Checklist

- Create and fund a Chainlink VRF v2.5 subscription on Sepolia.
- Add the deployed CareLotto contract as an approved subscription consumer.
- Add these values locally and in Vercel:

```bash
CHAINLINK_VRF_SUBSCRIPTION_ID=
CHAINLINK_VRF_COORDINATOR=0x9DdfaCa8183c41ad55329BdeeD9F6A8d53168B1B
CHAINLINK_VRF_KEY_HASH=0x787d74caea10b2b357790d5b5247c2f63d1d91572a9846f780606e4d953677ae
CHAINLINK_VRF_CALLBACK_GAS_LIMIT=200000
CHAINLINK_VRF_NATIVE_PAYMENT=false
VITE_CARELOTTO_CONTRACT_ADDRESS=
```

Current Sepolia deployment:

- Contract: `0x6124d9ed4ddd306f434ebfbd93c82963eefa6142`
- Deployment transaction: `0xb7c8e5153f8a4f1cfb153a3a75166b69a6dcd4588cfe553ffbcd0456d0d4d2d0`
- Funded subscription ID: `68708946863532012447477294872412151512706447898369376774965116309887808902076`

## Acceptance Checklist

- [x] Dashboard shows round entries before winner selection.
- [x] Dashboard sends a real `requestLotteryWinner()` transaction when a deployed contract address is configured.
- [x] Dashboard shows random word and winning entry index after fulfillment.
- [x] Dashboard shows winning artwork ticket and payout wallet.
- [x] Contract has request/result events for VRF handoff.
- [x] Contract imports Chainlink VRF v2.5 consumer base.
- [x] Contract requests VRF randomness and handles `fulfillRandomWords()`.
- [x] Contract selects the winner onchain using `randomWord % entryCount`.
- [ ] Deploy contract on Sepolia.
- [ ] Add deployed contract as a Chainlink VRF subscription consumer.
